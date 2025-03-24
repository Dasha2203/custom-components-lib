import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',
    entry: paths.entry,
    output: {
      filename: 'index.js',
      path: paths.output,
      libraryTarget: 'umd',
      library: 'customComponentsLib',
    },
    resolve: buildResolvers(options),
    module: {
      rules: buildLoaders(options),
    },
    externals: {
      react: 'React',
      'react-dom': 'react-dom',
    },
    plugins: buildPlugins(options),
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
