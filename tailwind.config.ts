import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00adff",

          secondary: "#00a800",

          accent: "#00fa5c",

          neutral: "#2b291e",

          "base-100": "#19232b",

          info: "#006af7",

          success: "#00f0a6",

          warning: "#f14f00",

          error: "#ff8da9",
          body: {
            "background-color": "#19232b",
          },
        },
      },
    ],
  },
};
export default config;
