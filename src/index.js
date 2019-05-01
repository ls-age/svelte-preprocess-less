import { default as lessCompiler } from 'less';
import { style as filter } from 'svelte-preprocess-filter';

export async function preprocessLess(
  lessOptions = {},
  filterOptions = {},
  { filename, content, attributes }
) {
  if (!filter(Object.assign({ name: 'less' }, filterOptions), { attributes })) { return null; }

  try {
    const { css, map, imports } = await lessCompiler.render(content, Object.assign({
      filename,
      sourceMap: {},
    }, lessOptions));

    return { code: css, map, dependencies: imports };
  } catch (err) {
    const { line, column, index: character, extract } = err;
    if (!(line && column && extract)) throw err;

    const frame = extract.map((l, i) => `${(line - 1) + i}:${l}`);
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

export function less(lessOptions, filterOptions) {
  return preprocessLess.bind(null, lessOptions, filterOptions);
}
