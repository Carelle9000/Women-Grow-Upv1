 /**@type {import('tailwindcss').Config} */
 module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // Adapte selon tes fichiers
      "./public/index.html",          // Si tu utilises un fichier HTML
    ],
    theme: {
        extend: {
          keyframes: {
            'bounce-in': {
              '0%': { opacity: '0', transform: 'scale(0.7)' },
              '100%': { opacity: '1', transform: 'scale(1)' },
            },
          },
          animation: {
            'bounce-in': 'bounce-in 0.5s ease-out',
          },
          fontFamily: {
            'tienne': ['Tienne', 'sans-serif'],
          },
          backgroundImage: {
            'image': "url('/images/ton-image.jpg')",
          },
          colors: {
            roseClair: "#FADADD",
            fuchsia: "#FF00FF",
            violet: "#8A2BE2",
            indigoClair: "#b3c7f9",
          },
          
        },
      },
      
    plugins: [],
  }
  