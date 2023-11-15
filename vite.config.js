import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  build: {
    rollupOptions: {
      // Use Terser for JavaScript minification
      output: {
        minify: 'terser',
      },
    },
  },
});
