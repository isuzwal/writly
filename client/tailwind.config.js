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
        writly: "rgb(0,1,254)",
        maincolor:"rgb(29,28,28)",
        navabar:"rgb(36,39,41)"
      },
      fontFamily:{
        sans: ["DM Sans", "sans-serif"], 
        dm: ["Nunito", "sans-serif"], 
      }
    },
  },
  plugins: [],
}

