import { createRequire } from 'node:module';
const require = createRequire( import.meta.url );

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'


export default defineConfig({
  plugins: [
    react(),
    ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } )
  ],
  base:"https://facundomarcobacigalupo.github.io/Blog",
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