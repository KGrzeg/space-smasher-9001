import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs'

export default defineConfig({
  input: './server.js',
  output: {
    file: 'dist/app.js',
    format: 'cjs'
  },
  external: [
    'express',
    "cors",
    "dotenv",
    "jsonwebtoken",
    // "lowdb", NOT YOU!
    "morgan",
  ],
  plugins: [
    resolve(),
    commonJS({
      include: 'node_modules/**'
    }),
  ],
});
