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

test('preprocessLess should format errors correctly', async t => {
  const error = await t.throws(preprocessLess({}, {}, {
    attributes: { lang: 'less' },
    filename: './src/components/App.html',
    content: `b {
  color: @color
}`,
  }));

  t.is(error.frame, '1:b {\n2:  color: @color\n           ^\n3:}');
  t.deepEqual(error.start, { line: 2, column: 9, character: 13 });
  t.is(error.start, error.end);
});

test('less should return a function', async t => {
  t.is(typeof less(), 'function');
});
