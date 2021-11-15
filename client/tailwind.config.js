module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          "primary": "#242424",
          "dark": "#1B1B1B",
        }
      },
      maxWidth: {
        xxs: "14rem",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
