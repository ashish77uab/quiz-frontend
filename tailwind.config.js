/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          blue: '#007bff',
          indigo: '#6610f2',
          purple: '#6f42c1',
          pink: '#e83e8c',
          red: '#dc3545',
          orange: '#fd7e14',
          yellow: '#ffc107',
          green: '#28a745',
          teal: '#20c997',
          cyan: '#17a2b8',
          white: '#fff',
          gray: '#6c757d',
          grayDark: '#343a40',
          primary: '#007bff',
          secondary: '#6c757d',
          success: '#28a745',
          info: '#17a2b8',
          warning: '#ffc107',
          danger: '#dc3545',
          light: '#f8f9fa',
          dark: '#343a40',
          btnColor: '#6772e5',
          darkBlue: '#0b1024',
          darkBlueSupport: '#111a33',
        },
      },
      boxShadow: {
        card: "shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]",
        navbar: "shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [],
};
