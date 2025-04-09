/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        profile: "rgb(27,30,38)",
      },
      fontFamily:{
        sans: ["DM Sans", "sans-serif"], 
        dm: ["DM Sans", "sans-serif"], 
      }
    },
  },
  plugins: [],
}

