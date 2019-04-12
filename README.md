# svelte-preprocess-less

[![CircleCI](https://circleci.com/gh/ls-age/svelte-preprocess-less.svg?style=svg)](https://circleci.com/gh/ls-age/svelte-preprocess-less)
[![codecov](https://codecov.io/gh/ls-age/svelte-preprocess-less/branch/master/graph/badge.svg)](https://codecov.io/gh/ls-age/svelte-preprocess-less)

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
        style: less(),
      },
    }),
  ],
};
```

Now all `<style>` elements in your components that have a `type="text/less"` or `lang="less"` attribute will be preprocessed by less.

### Passing options to less

The `less` function passes the first argument to the less compiler, e.g.:

```javascript
...
less({
  plugins: [
    ...
  ]
})
```


### Filtering styles

The `less` function passes the second argument to [svelte-preprocess-filter](https://github.com/ls-age/svelte-preprocess-filter), e.g.:

```javascript
...
less(
  {} // Empty less options
  { all: true } // Preprocess all styles
)
```

For available options visit [the less documentation](http://lesscss.org/usage/#programmatic-usage).

