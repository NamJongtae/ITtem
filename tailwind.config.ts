import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "animate-slideOutRight",
    "animate-slideOutLeft",
    "animate-entering",
    "animate-leaving",
    "animate-slideFadeOutRight",
    "animate-bounceOpacity",
    "animate-slideUp",
    "animate-slideDown",
    "bg-red-400",
    "before:content-['판매완료']",
    "before:content-['거래중']",
    "before:text-3xl",
    "bg-rootColor betterhover:hover:bg-[#5588D9] text-white",
  ],
  theme: {
    extend: {
      colors: {
        rootColor: "#66a2fb",
      },
      gridTemplateColumns: {
        autoFill: "repeat(auto-fill, minmax(220px, 1fr))",
        autoFill_180: "repeat(auto-fill, minmax(180px, 1fr))",
        autoFill_140: "repeat(auto-fill, minmax(140px, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        betterhover: { raw: "(hover: hover)" },
        xs: "486px",
      },
      keyframes: {
        fadeInUp: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1.0)", opacity: "1" },
        },
        fadeOutDown: {
          "0%": { transform: "scale(1.0)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        slideFadeOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        bounceOpacity: {
          "0%": {
            transform: "translateY(0%)",
            backgroundColor: "rgb(96, 165, 250)",
          },
          "25%": {
            transform: "translateY(-100%)",
            backgroundColor: "rgb(59, 130, 246)",
          },
          "50%": {
            transform: "translateY(0%)",
            backgroundColor: "rgb(37, 99, 235)",
          },
          "75%": {
            transform: "translateY(-100%)",
            backgroundColor: "rgb(59, 130, 246)",
          },
          "100%": {
            transform: "translateY(0%)",
            backgroundColor: "rgb(96, 165, 250)",
          },
        },
      },
      animation: {
        entering: "fadeInUp 200ms ease-out",
        leaving: "fadeOutDown 200ms ease-in",
        slideFadeOutRight: "slideFadeOutRight 1s ease-in-out",
        slideOutRight: "slideOutRight 0.5s ease-in-out",
        slideOutLeft: "slideOutLeft 0.5s",
        bounceOpacity: "bounceOpacity 1.5s infinite",
        slideUp: "slideUp 0.3s ease-in-out",
        slideDown: "slideDown 0.3s",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    function ({ addUtilities }: any) {
      const newUtilities = {
        // 스크롤바와 스크롤바 트랙 스타일링
        ".scrollbar": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(229, 231, 235)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(107, 114, 128)",
            borderRadius: "10px",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
export default config;
