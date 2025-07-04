import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Agrosimples/', // 👈 importante para GitHub Pages
});
