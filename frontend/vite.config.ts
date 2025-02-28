import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build:{
    outDir:'dist'

  },
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:7000',
        ws: true, // Enable WebSocket proxying
        changeOrigin: true,
      },
      
    }
  }
})
