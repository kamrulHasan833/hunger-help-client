/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#2CDD0D",
        "secondary-color": "#A4161B",
        "titile-color": "#000000",
        "desc-color": "#808080",
        "border-color": "#D4D4D4",
        "link-color": "#",
      },
      maxWidth: {
        large: "120rem",
        standard: "96rem",
      },
      fontFamily: {
        raleway: "'Raleway', sans-serif",
      },
    },
  },
  plugins: [require("daisyui")],
};
