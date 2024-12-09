import type { PluginOption } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export const BasicSslPluginConfig: PluginOption = basicSsl({
  /** name of certification */
  name: 'test',
  /** custom trust domains */
  domains: ['*.custom.com'],
  /** custom certification directory */
  certDir: '/Users/.../.devServer/cert',
});
