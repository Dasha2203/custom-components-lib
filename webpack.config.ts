import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from './config/build/types/types';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'dist'),
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    src: path.resolve(__dirname, 'src'),
  };
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3200,
    mode: env.mode ?? 'development',
    analyzer: false,
    paths,
    platform: env.platform ?? 'desktop',
  });

  return config;
};
