import path from 'node:path';

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';

/**
 * 统一生成库包的 JS 与 DTS 打包配置。
 *
 * @param {{
 *   packageDir: string;
 *   input?: string;
 *   external?: string[];
 *   css?: boolean;
 * }} options
 */
export function createPackageConfig({
  packageDir,
  input = 'src/index.ts',
  external = [],
  css = false,
}) {
  const inputPath = path.resolve(packageDir, input);
  const tsconfigPath = path.resolve(packageDir, 'tsconfig.json');
  const jsPlugins = [
    nodeResolve({
      extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
    }),
    commonjs(),
    esbuild({
      tsconfig: tsconfigPath,
      target: 'es2020',
      jsx: 'automatic',
      sourceMap: true,
      loaders: {
        '.ts': 'ts',
        '.tsx': 'tsx',
      },
    }),
  ];

  if (css) {
    jsPlugins.push(
      postcss({
        extract: 'styles.css',
        minimize: false,
        plugins: [postcssImport()],
      }),
    );
  }

  return [
    {
      input: inputPath,
      external,
      output: [
        {
          file: path.resolve(packageDir, 'dist/index.mjs'),
          format: 'esm',
          sourcemap: true,
        },
        {
          file: path.resolve(packageDir, 'dist/index.cjs'),
          format: 'cjs',
          exports: 'named',
          sourcemap: true,
        },
      ],
      plugins: jsPlugins,
    },
    {
      input: inputPath,
      external: [/\.css$/],
      output: [
        {
          file: path.resolve(packageDir, 'dist/index.d.ts'),
          format: 'es',
        },
      ],
      plugins: [
        dts({
          tsconfig: tsconfigPath,
        }),
      ],
    },
  ];
}
