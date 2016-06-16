"use strict"

const ngAnnotate = require("ng-annotate")

module.exports = class {
  constructor(config) {
    this.config = (config && config.plugins && config.plugins.ngAnnotate) || {add: true}
    this.pattern = config.pattern || /\.js$/
  }

  compile(file) {
    const {src, map, errors} = ngAnnotate(file.data, this.config)
    if (errors) return Promise.reject(errors)
    return Promise.resolve(Object.assign({}, file, {data: src, map}))
  }

  get brunchPlugin() { return true }
  get type() { return "javascript" }
}
