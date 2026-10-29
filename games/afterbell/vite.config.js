import { defineConfig } from 'vite';
export default defineConfig({
  root: 'src',
  base: './',
  build: { outDir: '../play', emptyOutDir: true },
  server: {
    strictPort: true,
    proxy: {
      '/api/afterbell': 'http://127.0.0.1:4319',
      '/api/quizzes': 'http://127.0.0.1:4319'
    }
  }
});
