# Inject this brunch!

A [ng-annotate](https://www.npmjs.com/package/ng-annotate) plugin for [brunch](http://brunch.io/).

## Why not the other existing things?

Two ng-annotate plugins for brunch already exist: [ng-annotate-brunch](https://www.npmjs.com/package/ng-annotate-brunch)
and [ng-annotate-uglify-js-brunch](https://www.npmjs.com/package/ng-annotate-uglify-js-brunch). These two did not fit
my use case because they place the annotating process inside the optimize phase of brunch. This means that
annotations were not present in the development build, only in the production build. I want the annotations to be there
in dev so I can have `ng-strict-di` enabled and that will check if the annotations are really all there.

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
