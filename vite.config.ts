import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.png', '**/*.svg'],
  server: {
    open: true,
    port: 5002,
    host: true,
  },
  build: {
    outDir: 'dist',
  },
  publicDir: 'src/assets/images',
  plugins: [react()],
  base: '/Slots/',
});
