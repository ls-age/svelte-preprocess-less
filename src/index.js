import { default as lessCompiler } from 'less';
import { style as filter } from 'svelte-preprocess-filter';

export async function preprocessLess(
  lessOptions = {},
  filterOptions = {},
  { filename, content, attributes }
) {
  if (!filter(Object.assign({ name: 'less' }, filterOptions), { attributes })) { return null; }

  const { css, map } = await lessCompiler.render(content, Object.assign({
    filename,
    sourceMap: {},
  }, lessOptions));

  return { code: css, map };
}

export function less(lessOptions, filterOptions) {
  return preprocessLess.bind(null, lessOptions, filterOptions);
}
