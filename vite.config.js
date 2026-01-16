import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 根据环境变量设置 base 路径，支持 GitHub Pages 部署
// 如果设置了 VITE_BASE 环境变量则使用，否则根据 NODE_ENV 判断
// 开发环境使用根路径，生产环境使用仓库名作为 base
const base = process.env.VITE_BASE || (process.env.NODE_ENV === 'production' ? '/2026-1-8-Mondrian-Calculator/' : '/')

export default defineConfig({
  base: base,
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',  // 使用 esbuild（默认，更快），不需要额外安装
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})

