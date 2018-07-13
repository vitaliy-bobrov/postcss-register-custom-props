# postcss-register-custom-props
[![Build Status](https://travis-ci.org/vitaliy-bobrov/postcss-register-custom-props.svg?branch=master)](https://travis-ci.org/vitaliy-bobrov/postcss-register-custom-props)
[![npm version](https://badge.fury.io/js/postcss-register-custom-props.svg)](https://badge.fury.io/js/postcss-register-custom-props)
[![npm](https://img.shields.io/npm/dt/postcss-register-custom-props.svg)](https://github.com/vitaliy-bobrov/postcss-register-custom-props)

PostCSS plugin that transforms custom property registration in CSS to JS.

According to the current ["Custom Properties and Values API Level 1"](https://www.w3.org/TR/css-properties-values-api-1/) specification you can register *custom property* with JavaScript, like:

```js
CSS.registerProperty({
  name: "--highlight-color",
  syntax: "<color>",
  initialValue: "red",
  inherits: false
});
```

There is a proposal to the ["Custom Properties and Values API Level 2"](https://github.com/w3c/css-houdini-drafts/issues/137) specification to make it possible to do the same in CSS:

```css
@property --highlight-color {
  syntax: '<color>';
  initial-value: red;
  inherits: false;
}
```

This PostCSS plugin allows you to declare custom property in CSS and generate JavaScript file that contains registrations.

**Input:**

```css
@property --theme {
  syntax: '<color>+';
  initial-value: #fff;
  inherits: true;
}
```

**Output:**

```js
if ("registerProperty" in CSS) {
  CSS.registerProperty({
    name: "--theme",
    syntax: "<color>+",
    initialValue: "#fff",
    inherits: true
  });
}
```

## Installation
- npm:
  `npm install --save-dev postcss-register-custom-props`

- yarn:
  `yarn add -D postcss-register-custom-propsk`

## Usage

```bash
postcss([ require('postcss-register-custom-props')( /* options */ ) ])
```

See [PostCSS] docs for examples of your environment.

## Options

### output
Specifies custom properties JavaScript file path and name. Defaults to `./custom-properties.js`.

