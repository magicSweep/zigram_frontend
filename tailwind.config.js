const colors = {
  primary: "#1976d2", // "#7986cb", //#303f9f
  secondary: "#9c27b0", //"#ff4081",
  paper: "#fff",
  white: "#fff",
  disabled: "#bdbdbd",
  title: "rgba(0, 0, 0, 0.87)",
  body: "rgba(0, 0, 0, 0.54)",
  error: "#d32f2f",
  info: "#0288d1",
  warning: "#ED6C02",
  success: "#2e7d32",
};

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    options: {
      keyframes: false,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        /* primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        disabled: "var(--color-disabled)", */
        ...colors,
        paper: "var(--color-paper)",
        //"btn-hover": "var(--color-btn-hover)"
      },
      textColor: {
        //title: "var(--color-title)",
        //body: "var(--color-body)",
        ...colors,
        /* disabled: "var(--color-disabled)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)", */
      },
      borderColor: {
        ...colors,
      },
      maxHeight: {
        600: "600px",
      },
      minHeight: {
        44: "44px",
        260: "260px",
      },
      minWidth: {
        44: "44px",
      },
    },
  },
  variants: {
    extend: {
      padding: ["last"],
    },
  },
  plugins: [],
};
