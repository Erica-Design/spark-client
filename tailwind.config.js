/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

const focusedSiblingPlugin = plugin(function ({ addVariant, e }) {
  addVariant("focused-sibling", ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:focus + .focused-sibling\\:${rule.selector.slice(1)}`;
    });
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        100: "25rem",
        120: "30rem",
      },
      fontFamily: {
        Pretendard: ["Pretendard"],
        SUIT: ["SUIT"],
      },
      backgroundColor: ["focused-sibling"],
    },
    extend: {
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [focusedSiblingPlugin],
  corePlugins: {
    "@layer utilities": {
      ".nth-child-5:nth-child(5)": {
        paddingTop: "200px",
      },
    },
  },
};
