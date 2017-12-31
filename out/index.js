'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var less = require('less');

function filter(attributes, name) {
  const typeAttributes = [attributes.type, attributes.lang];

  return typeAttributes.includes(name) || typeAttributes.includes(`text/${name}`);
}

async function preprocessLess(lessOptions = {}, { filename, content, attributes }) {
  if (!filter(attributes, 'less')) {
    return null;
  }

  const { css, map } = await less.render(content, Object.assign({
    filename,
    sourceMap: {}
  }, lessOptions));

  return { code: css, map };
}

function less$1(lessOptions) {
  return preprocessLess.bind(null, lessOptions);
}

exports.preprocessLess = preprocessLess;
exports.less = less$1;
//# sourceMappingURL=index.js.map
