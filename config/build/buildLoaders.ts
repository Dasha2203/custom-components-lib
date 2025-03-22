import autoprefixer from 'autoprefixer';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              { name: 'convertColors', params: { currentColor: true } },
            ],
          },
        },
      },
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [autoprefixer()],
          },
        },
      },
      'sass-loader',
    ],
  };
  const tsLoader = {
    test: /\.(ts|tsx)?$/,
    use: ['ts-loader'],
    exclude: /node_modules|(\.test\.tsx?$|\.stories\.tsx?$)/,
  };

  return [assetLoader, scssLoader, tsLoader, svgLoader];
}
