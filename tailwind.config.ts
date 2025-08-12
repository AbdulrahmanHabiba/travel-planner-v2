import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  // The following is optional in Tailwind v4 but harmless
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;




