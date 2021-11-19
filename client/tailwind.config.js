module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          "primary": "#242424",
          "dark": "#1B1B1B",
        },
        blue: {
          "image": "#194bff",
        }
      },
      maxWidth: {
        xxs: "14rem",
        "list-red": "300px",
        "list-small": "240px",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
