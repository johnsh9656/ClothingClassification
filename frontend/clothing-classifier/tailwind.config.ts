import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#212121",
        altbackground: "#171717",
        content: "#FFFFFF",
        contenthover: "#dfdfdf",
        accent: "#525DD5",
        accenthover: "#434ec8",
      },
    },
    dropShadow: {
      customBigger: '6px 6px rgb(0, 0, 0)',
      hoverBigger: '14px 14px rgb(0, 0, 0)',
      custom: '4px 4px rgb(0, 0, 0)',
      hover: '10px 10px rgb(0, 0, 0)',
    }
  },
  plugins: [],
} satisfies Config;
