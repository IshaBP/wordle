import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/wordle/',
  plugins: [
    react({
      babel: {
        configFile: true,
      },
    }),
    eslintPlugin(),
  ],
});
