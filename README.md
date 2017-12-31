# svelte-preprocess-less

[![Greenkeeper badge](https://badges.greenkeeper.io/ls-age/svelte-preprocess-less.svg)](https://greenkeeper.io/)

> Svelte preprocessor for [less](http://lesscss.org)

## Installation

```bash
npm install --save-dev svelte-preprocess-less less
```

## Usage

**Using rollup-plugin-svelte**

```javascript
// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import { less } from 'svelte-preprocess-less';
...

export default {
  ...
  plugins: [
    ...
    svelte({
      preprocess: {
        style: less(/*  object of less options (optional) */),
      },
    }),
  ],
};
```
