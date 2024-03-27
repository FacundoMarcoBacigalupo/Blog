// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import commonjs from 'rollup-plugin-commonjs'


// export default defineConfig({
//   plugins: [
//     react(),
//     commonjs()
//   ],
//   base:"https://facundomarcobacigalupo.github.io/Blog",
//   build: {
//     commonjsOptions: {
//       include: [/@workspace\/ckeditor5-custom-build/, /node_modules/],
//       exclude: ['ckeditor5-custom-build']
//     }
//   },
//   optimizeDeps: {
//     include: ['@workspace/ckeditor5-custom-build','ckeditor5-custom-build']
//   }
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  base: "https://facundomarcobacigalupo.github.io/Blog",
  optimizeDeps: {
    include: ['@workspace/ckeditor5-custom-build','ckeditor5-custom-build']
  }
})