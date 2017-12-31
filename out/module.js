import { render } from 'less';

function filter(attributes, name) {
  const typeAttributes = [attributes.type, attributes.lang];

  return typeAttributes.includes(name) || typeAttributes.includes(`text/${name}`);
}

async function preprocessLess(lessOptions = {}, { filename, content, attributes }) {
  if (!filter(attributes, 'less')) {
    return null;
  }

  const { css, map } = await render(content, Object.assign({
    filename,
    sourceMap: {}
  }, lessOptions));

  return { code: css, map };
}

function less$1(lessOptions) {
  return preprocessLess.bind(null, lessOptions);
}

export { preprocessLess, less$1 as less };
//# sourceMappingURL=module.js.map
