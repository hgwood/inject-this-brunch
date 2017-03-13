# Inject this brunch!

A [ng-annotate](https://www.npmjs.com/package/ng-annotate) plugin for [brunch](http://brunch.io/).

**DEPRECATED**: [ng-annotate](https://github.com/olov/ng-annotate), which this project depends on, is now [deprecated](https://github.com/olov/ng-annotate/issues/245). You are [advised](https://github.com/olov/ng-annotate/issues/245#issuecomment-247245655) to use [babel-plugin-angularjs-annotate](https://github.com/schmod/babel-plugin-angularjs-annotate) instead.

## Why not the other existing things?

Two ng-annotate plugins for brunch already exist: [ng-annotate-brunch](https://www.npmjs.com/package/ng-annotate-brunch)
and [ng-annotate-uglify-js-brunch](https://www.npmjs.com/package/ng-annotate-uglify-js-brunch).

### Initial reason (turns out to be invalid)

The two existing solutions did not fit
my use case because they place the annotating process inside the optimize phase of brunch. This means that
annotations were not present in the development build, only in the production build. I want the annotations to be there
in dev so I can have `ng-strict-di` enabled and that will check if the annotations are really all there.

[Turns out you can use the `plugins.on` option in the brunch config to force optimize plugins to run](https://github.com/hgwood/inject-this-brunch/issues/6#issue-184146926).

### Actual reasons

- You might not need or want to minify at the same stage as annotating so ng-annotate-uglify-js-brunch is out.
- ng-annotate-brunch does not have source maps support.
- ng-annotate-brunch does not support an ignore option, which can give a significant speed boost.

## Usage

`npm install inject-this-brunch`

### Configuration

```js
plugins: {
  ngAnnotate: {
    // place config here
  }
}
```

#### For ng-annotate

The plugin configuration is passed to [ng-annotate](https://github.com/olov/ng-annotate/blob/master/OPTIONS.md#library-api).
By default, the following options are passed: `{add: true, remove: true, map: {inFile: <path of input file>}}`, i.e.
annotations are rebuilt and source maps are generated.

When a configuration is provided in `brunch-config.js`:
- `add` and `remove` default to `true` unless they are explicitly set to falsy values.
- `map.inFile` is automatically provided unless `map` is explicitly set to a falsy value.

#### `pattern`

Default: `/\.js$/`

#### `ignore`

Default: `/^(bower_components|vendor)/`
