import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts', // Entry point
  output: [
    {
      file: 'dist/bundle.umd.js',
      format: 'umd', // Universal Module Definition
      name: 'MyLibrary', // Global name in UMD builds
      sourcemap: true,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es', // ESM format
      sourcemap: true,
    }
  ],
  plugins: [
    resolve(), // To resolve node_modules
    commonjs(), // To convert CommonJS modules to ES6
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true, // Output .d.ts files to the specified folder
    }),
  ]
};