import lessCompiler from 'less';

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

  const { css, map } = await lessCompiler.render(content, Object.assign({
    filename,
    sourceMap: {}
  }, lessOptions));

  return { code: css, map };
}

function less(lessOptions, filterOptions) {
  return preprocessLess.bind(null, lessOptions, filterOptions);
}

export { preprocessLess, less };
//# sourceMappingURL=module.js.map
