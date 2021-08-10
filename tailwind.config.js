module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          550: "#84CC16",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
