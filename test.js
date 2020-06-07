'use strict'

const fs = require('fs')
const ava = require('ava')
const postcss = require('postcss')

const plugin = require('./index')

function run (t, input, expectJS, opts) {
  opts = opts || {}

  return postcss([plugin(opts)])
    .process(input)
    .then(result => {
      let outputJS = fs.readFileSync(opts.output, 'utf8')

      t.is(outputJS, expectJS)
      t.is(result.warnings().length, 0)
    })
}

ava('should register color property', t => {
  let inputCSS = fs.readFileSync('test/register.input.css', 'utf8')
  let expectJS = fs.readFileSync('test/register.expect.js', 'utf8')

  return run(t, inputCSS, expectJS, { output: 'test/register.output.js' })
})

ava('should register multiple properties', t => {
  let inputCSS = fs.readFileSync('test/register-multiple.input.css', 'utf8')
  let expectJS = fs.readFileSync('test/register-multiple.expect.js', 'utf8')

  return run(t, inputCSS, expectJS, {
    output: 'test/register-multiple.output.js'
  })
})
