import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'rollup-plugin-commonjs'


export default defineConfig({
  plugins: [
    react(),
    commonjs()
  ],
  build: {
    commonjsOptions: {
      include: [/@workspace\/ckeditor5-custom-build/, /node_modules/],
      exclude: ['ckeditor5-custom-build']
    }
  },
  optimizeDeps: {
    include: ['@workspace/ckeditor5-custom-build','ckeditor5-custom-build']
  }
})