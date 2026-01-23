import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('placeholder')) {
          return new URLSearchParams({
            format: 'webp',
            w: '20',
            quality: '20',
            blur: '20',
          })
        }
        return new URLSearchParams({
          format: 'webp',
          quality: '85',
        })
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
