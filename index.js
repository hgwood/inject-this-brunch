"use strict"

const anymatch = require("anymatch")
const ngAnnotate = require("ng-annotate")

module.exports = class ngAnnotateCompiler {
  constructor(config) {
    this.config = defaults(config && config.plugins && config.plugins.ngAnnotate, {
      add: true,
      remove: true,
      map: false,
    })
    this.pattern = this.config.pattern || /\.js$/
    this.isIgnored = anymatch(this.config.ignore || /^(bower_components|vendor)/)
  }

  compile(file) {
    if (this.isIgnored(file.path)) return Promise.resolve(file)
    const options = withInFile(this.config, file.path)
    const results = ngAnnotate(file.data, options)
    if (results.errors) return Promise.reject(results.errors)
    return Promise.resolve(Object.assign(file, {data: results.src, map: file.map}))
  }

  get brunchPlugin() { return true }
  get type() { return "javascript" }
}

function defaults(options, defaults) {
  return Object.assign(defaults, options)
}

function withInFile(options, inFile) {
  if (!options.map) return options
  return Object.assign(options, {
    map: Object.assign(options.map, {inFile})
  })
}
