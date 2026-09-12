import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],

  base: '/Goat-Management-System/',

  server: {
    port: 5173,
  },
});