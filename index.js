'use strict'

const postcss = require('postcss');
const prettier = require('prettier');
const fs = require('fs');

const AT_RULE = 'property';
const DEFAULTS = {
  output: './custom-properties.js'
};

function sanitizeValue (value) {
  return value.replace(/^("|')|("|')$/g, '');
}

function configToRegister (config) {
  let props = Object.keys(config)
    .map(prop => {
      let isBoolProp = prop !== 'inherits';
      let value = isBoolProp ? `'${ config[prop] }'` : config[prop];

      return `${ prop }: ${ value }`;
    })
    .join(',');

  return `CSS.registerProperty({${ props }});`;
}

function generateJSDefinitions (declarations) {
  let registrations = Object.keys(declarations)
    .map(name => configToRegister(declarations[name]))
    .join('');

  return `if ('registerProperty' in CSS) {${ registrations }}`;
}

function validateProps (config, rule) {
  if (!config.name) {
    throw rule.error('Custom property name is required.');
  }

  if (!config.syntax) {
    throw rule.error('Custom property "syntax" is required.');
  }

  if (!config.syntax) {
    throw rule.error('Custom property "inherits" is required.');
  }
}

function processDefinition (atRule) {
  let config = {
    name: atRule.params
  };

  atRule.walkDecls(/syntax|initial-value|inherits/, decl => {
    switch (decl.prop) {
      case 'initial-value':
        config.initialValue = sanitizeValue(decl.value);
        break;

      case 'syntax':
        config[decl.prop] = sanitizeValue(decl.value);
        break;

      case 'inherits':
        config[decl.prop] = decl.value === 'true';
        break;

      default:
        break;
    }
  });

  validateProps(config, atRule);

  return config;
}

module.exports = postcss.plugin('postcss-register-custom-props', opts => {
  opts = opts ? Object.assign({}, DEFAULTS, opts) : DEFAULTS;

  return css => {
    let declarations = {};

    css.walkAtRules(atRule => {
      if (atRule.name === AT_RULE) {
        declarations[atRule.params] = processDefinition(atRule);
      }
    });

    let source = generateJSDefinitions(declarations);
    let data = prettier.format(source, { parser: 'babel' });

    fs.writeFileSync(opts.output, data);
  };
});
