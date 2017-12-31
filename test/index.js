import test from 'ava';
import { less, preprocessLess } from '../src/index';

test('preprocessLess should filter non-less styles', async t => {
  t.is(await preprocessLess({}, {}, { attributes: {} }), null);
});

test('preprocessLess should return preprocessed styles', async t => {
  const result = await preprocessLess({}, {}, {
    attributes: { lang: 'less' },
    filename: './src/components/App.html',
    content: `@color: red;
b { color: @color }`,
  });
  t.is(result.code, `b {
  color: red;
}
`);
});

test('less should return a function', async t => {
  t.is(typeof less(), 'function')
});
