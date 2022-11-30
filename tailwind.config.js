const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "accent-green": "#284F49",
      "accent-orange": "#E68314",
      "accent-offwhite": "#F2F0E0",
      "accent-gray": "#808080",
      gray: colors.neutral,
    },
  },
};
