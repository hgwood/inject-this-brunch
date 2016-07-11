"use strict"

const anymatch = require("anymatch")
const ngAnnotate = require("ng-annotate")
const assignToCopy = (...sources) => Object.assign(...sources)

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
    const {src, map = file.map, errors} = ngAnnotate(file.data, options)
    if (errors) return Promise.reject(errors)
    return Promise.resolve(assignToCopy(file, {data: src, map}))
  }

  get brunchPlugin() { return true }
  get type() { return "javascript" }
}

function defaults(options, defaults) {
  return assignToCopy(defaults, options)
}

function withInFile(options, inFile) {
  if (!options.map) return options
  return assignToCopy(options, {
    map: assignToCopy(options.map, {inFile})
  })
}
