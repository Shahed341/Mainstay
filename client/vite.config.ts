/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/vite.config.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      clientPort: 5173,
    },
  },
});
