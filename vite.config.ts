import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import sass from 'vite-plugin-sass';

export default defineConfig({
  base: '',
  plugins: [svgr(), react(), sass()],
  optimizeDeps: {
    extensions: ['.css'],
  },
});
