# svelte-preprocess-less

[![CircleCI](https://circleci.com/gh/ls-age/svelte-preprocess-less.svg?style=svg)](https://circleci.com/gh/ls-age/svelte-preprocess-less)
[![codecov](https://codecov.io/gh/ls-age/svelte-preprocess-less/branch/master/graph/badge.svg)](https://codecov.io/gh/ls-age/svelte-preprocess-less)
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
        style: less(/* object of less options (optional) */),
      },
    }),
  ],
};
```

Now all `<style>` elements in your components that have a `type="text/less"` or `lang="less"` attribute will be preprocessed by less.
