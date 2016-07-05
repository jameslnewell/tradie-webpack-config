# tradie-webpack-config

Factories for [tradie](https://www.npmjs.com/package/tradie) webpack config.

## Installation

```bash
npm install --save tradie-webpack-config
```

## Usage

```js
import webpack from 'webpack';
import {createServerConfig} from 'tradie-webpack-config';

const tradieConfig = {/* insert tradie config here */};
const webpackConfig = createServerConfig(tradieConfig);

webpack(webpackConfig, (err, stats) => {/* do something here */});

```

## API

```js
createVendorConfig(tradieConfig : object) : object
```

Creates config for a vendor bundle using webpack's `DllPlugin`.

- `json-loader`
- `babel-loader`
- ...

```js
createClientConfig(tradieConfig : object) : object
```

Creates config for one or more client bundles with the following features:

- `json-loader`
- `babel-loader`
- `file-loader` (`.jpeg`, `.jpg`, `.gif`, `.png`, `.svg`, `.woff`, `.ttf` and `.eot`)
- `css-loader`, `postcss-loader`, `resolve-url-loader` and `sass-loader`
- optimisation (`DefinePlugin`, `UglifyPlugin`, hashing etc)
- creation of a separate stylesheet containing style files
- use of `DllReferencePlugin`
- ...


```js
createServerConfig(tradieConfig : object) : object
```

Creates config for a server bundle with the following features:

- `json-loader`
- `babel-loader`
- exclusion of style files
- ...

```js
createTestConfig(tradieConfig : object) : object
```

Creates config for a test bundle with the following features:

- `json-loader`
- `babel-loader`
- `mocha` test runner
- ...
