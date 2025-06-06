/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skyBlue: "#60A5FA",
        cornflowerBlue: "#3B82F6",
        indigoBlue: "#1E3A8A",
        powderBlue: "#DBEAFE",
      },
    },
  },
  plugins: [],
};
