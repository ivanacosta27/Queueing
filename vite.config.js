import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Queueing/',  // This should match your GitHub repository name
  plugins: [react()],
});
