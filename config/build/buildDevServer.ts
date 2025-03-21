import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port: port ?? 9999,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}
