module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    backgroundSize: {
      "100": "100% 100%",
    },
    extend: {
      backgroundImage: {
        assets_f: "url('/assets/assets_f.png')",
        assets_s: "url('/assets/assets_s.png')",
        assets_t: "url('/assets/assets_t.png')",
      },
    },
    colors: {
      greyblack:"rgba(0,0,0,0.6)",
      black:"#000",
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      grey: "rgba(255,255,255,0.5)",
      "card-bg": "#1C1A1B",
      ptheme: "#C5F971",
      lingergradebg: "linear-gradient(#978FF6,#B7B0FE)",
      "border-divider": "rgba(220, 219, 219,0.3)",
    },
  },
};
