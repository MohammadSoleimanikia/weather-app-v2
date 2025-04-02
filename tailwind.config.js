/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1E40AF", // Custom primary color (blue-900)
          secondary: "#9333EA", // Custom secondary color (purple-600)
          accent: "#FACC15", // Custom accent color (yellow-400)
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
        },
        spacing: {
          "128": "32rem",
          "144": "36rem",
        },
        borderRadius: {
          "xl": "1rem",
          "2xl": "1.5rem",
        },
      },
    },
    plugins: [],
  };
  