 /*@type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // Adapte selon tes fichiers
      "./public/index.html",          // Si tu utilises un fichier HTML
    ],
    theme: {
        extend: {
          fontFamily: {
            'tienne': ['Tienne', 'sans-serif'],
          },
          backgroundImage: {
            'image': "url('/images/ton-image.jpg')",
          },
        },
      },
      
    plugins: [],
  }
  