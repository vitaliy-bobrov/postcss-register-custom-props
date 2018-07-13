const fs = require('fs');
const test = require('ava');
const postcss = require('postcss');
const plugin = require('./index');

function run(t, input, expectJS, opts = {}) {
  return postcss([ plugin(opts) ]).process(input)
    .then( result => {
      const outputJS = fs.readFileSync(opts.output, 'utf8');

      t.is(outputJS, expectJS);
      t.is(result.warnings().length, 0);
    });
}

test('should register color property', t => {
  const inputCSS = fs.readFileSync('test/register.input.css', 'utf8');
  const expectJS = fs.readFileSync('test/register.expect.js', 'utf8');

  return run(t, inputCSS, expectJS, {output: 'test/register.output.js'});
});

test('should register multiple properties', t => {
  const inputCSS = fs.readFileSync('test/register-multiple.input.css', 'utf8');
  const expectJS = fs.readFileSync('test/register-multiple.expect.js', 'utf8');

  return run(t, inputCSS, expectJS, {output: 'test/register-multiple.output.js'});
});
