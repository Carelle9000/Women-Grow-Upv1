import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),

  ],
  
  resolve: {
    alias: {
      '@': '/src', // Permet d'utiliser @ comme alias pour le dossier src
      'assets': '/src/assets', // Permet d'utiliser assets comme alias pour le dossier src/assets
     // '@': path.resolve(__dirname, 'src'),
    },
  },
})
