import { render as renderLess } from 'less';
import { style as filter } from 'svelte-preprocess-filter';

export async function preprocessLess(lessOptions = {}, { filename, content, attributes }) {
  if (!filter(attributes, 'less')) { return null; }

  const { css, map } = await renderLess(content, Object.assign({
    filename,
    sourceMap: {},
  }, lessOptions));

  return { code: css, map };
}

export function less(lessOptions) {
  return preprocessLess.bind(null, lessOptions);
}
