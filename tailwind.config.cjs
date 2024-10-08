module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui"), require('@tailwindcss/line-clamp')],
  theme: {
    extend: {
      fontSize: {
        xxs: "10px"
      },
      screens: {
        xxs: "300px",
        xs: "360px",
        '3xl': '1980px',
        '4xl': '2400px',
      },
      backgroundImage: {
        assets_f: "url('/assets/assets_f.png')",
        assets_s: "url('/assets/assets_s.png')",
        assets_t: "url('/assets/assets_t.png')",
        login_mene: "url('/assets/login_background.png')",
        wallet: "url('/assets/ido-bg.png')",
        blindboxbg: "url('/assets/blind-box-bg.png')",
        blindboxbgh5: "url('/assets/blindbox-bg-h5.png')",
        blindboxpopbg: "url('/assets/blindbox-btn-pop.png')",
        assetsbg: "url('/assets/assets_bg.png')",
        wfc_barner_bg: "url('/assets/wfcbg.png')",
        div_barner_image: "linear-gradient( 90deg, rgba(45,45,47,0) 0%, #2D2D2F 33%, #2D2D2F 67%, rgba(45,45,47,0) 100%)"
      },
      backgroundSize: {
        100: "100% 100%",
      },
      fontFamily: {
        whalebold: ["Alliance-bold", "Whale-bold"],
        gotham: ["Gotham-Book", "sans-serif"],
        'gotham-bold': ["Gotham-Bold", "sans-serif"],
      },
      colors: {
        green: "green",
        blue: "rgb(59 130 246)",
        lightgrey: "#ececec",
        transblack: "rgba(0,0,0,0.1)",
        threePranentTransblack: "rgba(0,0,0,0.38)",
        "black-800": "rgba(0,0,0,0.8)",
        light: "#d6d6d6",
        greyblack: "rgba(0,0,0,0.6)",
        black: "#000",
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
        "grey-700": "rgba(255,255,255,0.7)",
        "card-bg": "#1C1A1B",
        ptheme: "#C5F971",
        lingergradebg: "linear-gradient(#978FF6,#B7B0FE)",
        "border-divider": "rgba(220, 219, 219,0.3)",
        'gery-120': "rgba(255,255,255,0.12)",
        'gery-300': "rgba(255,255,255,0.3)"
      },
    },
  },
};
