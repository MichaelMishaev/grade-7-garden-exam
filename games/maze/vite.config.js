import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  build: { outDir: 'play', emptyOutDir: true },
  server: { proxy: { '/api': 'http://127.0.0.1:4328', '/garden-exam.html': 'http://127.0.0.1:4328', '/physics-exam.html': 'http://127.0.0.1:4328', '/subject.html': 'http://127.0.0.1:4328' } }
});
