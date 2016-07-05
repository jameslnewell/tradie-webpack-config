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

Creates config for a vendor bundle utilising webpack's `DllPlugin`.

```
createClientConfig(tradieConfig : object) : object
```

Creates config for one or more client bundles with the following features:

- abc
 

```
createServerConfig(tradieConfig : object) : object
```

Creates config for a server bundle with the following features:

- files with style extensions are ignored 

```
createTestConfig(tradieConfig : object) : object
```

Creates config for a test bundle with the following features: