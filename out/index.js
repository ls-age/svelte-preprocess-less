'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var lessCompiler = _interopDefault(require('less'));

/* eslint-disable import/prefer-default-export */

function style({ name, all = false, type = true, lang = true } = {}, { attributes } = {}) {
  if (all) {
    return true;
  }

  if (!name) {
    throw new Error('Missing \'name\' filter option');
  }
  if (!attributes) {
    throw new Error('No attributes passed to filter');
  }

  const typeAttributes = [type && attributes.type, lang && attributes.lang];

  return typeAttributes.includes(name) || typeAttributes.includes(`text/${name}`);
}

async function preprocessLess(lessOptions = {}, filterOptions = {}, { filename, content, attributes }) {
  if (!style(Object.assign({ name: 'less' }, filterOptions), { attributes })) {
    return null;
  }

  try {
    const { css, map } = await lessCompiler.render(content, Object.assign({
      filename,
      sourceMap: {}
    }, lessOptions));

    return { code: css, map };
  } catch (err) {
    const { line, column, index: character, extract } = err;
    if (!(line && column && extract)) throw err;

    const frame = extract.map((l, i) => `${line - 1 + i}:${l}`);
    frame.splice(2, 0, '^'.padStart(column + line.toString().length + 2));

    delete err.line;
    delete err.column;
    delete err.index;
    delete err.extract;
    err.frame = frame.join('\n');

    // The line number only counts from the beginning of the <style> tag.
    err.start = { line, column, character };
    err.end = err.start;

    throw err;
  }
}

function less(lessOptions, filterOptions) {
  return preprocessLess.bind(null, lessOptions, filterOptions);
}

exports.preprocessLess = preprocessLess;
exports.less = less;
//# sourceMappingURL=index.js.map
