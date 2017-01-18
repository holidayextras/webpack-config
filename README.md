# Webpack config

Proof of concept only, may delete this repo at any time.

We commonly use the same webpack features in our repos, we can share the same webpack config. If we use npm environment variables, then the webpack config can be agnostic to the repo. [Here is an example](webpack.config.js) feel free to use it in your repo. Build with npm scripts:
```
{
  "name": "foo",
  "version": "1.2.3",
  "main": "src/foo",
  "scripts": {
    "build": "npm run build:one && npm build:production",
    "build:one": "webpack --config node_modules/webpack-config/webpack.config.js",
    "build:production": "NODE_ENV=production npm run build:one",
  },
  "devDependencies": {
  }
}
```
Build with `npm run build` and this will build a minified and non minified version of this repository's code in dist/

## @todo
- even more env vars?
