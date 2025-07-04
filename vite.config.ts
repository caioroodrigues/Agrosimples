import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Agrosimples/', // 👈 Caminho relativo para GitHub Pages
});
