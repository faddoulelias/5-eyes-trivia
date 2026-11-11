import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset URLs relative, so dist/ can be dropped on any static
// host or sub-path (GitHub Pages, S3, Azure Static Web Apps, ...).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5199, strictPort: true },
});
