import babel from 'rollup-plugin-babel';

const dev = process.env.NODE_ENV !== 'production';

export default {
  input: './src/index.js',
  external: [
    'less',
  ],
  plugins: [
    babel(),
  ],
  output: [
    {
      file: './out/index.js',
      format: 'cjs',
      sourcemap: dev,
    },
    {
      file: './out/module.js',
      format: 'es',
      sourcemap: dev,
    },
  ],
};
