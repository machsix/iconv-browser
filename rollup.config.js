import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';

// TODO commonjs bug https://github.com/rollup/plugins/issues/304

const basicConfig = {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
    strict: false // fix https://github.com/facebook/regenerator/blob/a755f3f0cd7928c1b89c251e5e84472aa31b7e33/packages/regenerator-runtime/runtime.js#L725
    // globals: {
    //   "@babel/runtime/regenerator": "regeneratorRuntime"
    // }
    // https://github.com/rollup/rollup-plugin-babel/issues/306
  },
  plugins: [
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**'
    }),
    // resolve(),
    commonjs({
      ignoreGlobal: true, // to make text-encoding works
      namedExport: {
        loglevel: ['noConflict']
      }
    })
  ]
};

export default (commandLineArgs) => {
  return basicConfig;
};
