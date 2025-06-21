/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fillout-primary': '#3b82f6',
        'fillout-hover': '#f3f4f6',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        fillout: {
          "primary": "#3b82f6",
          "secondary": "#f97316",
          "accent": "#8b5cf6",
          "neutral": "#1f2937",
          "base-100": "#ffffff",
          "info": "#60a5fa",
          "success": "#34d399",
          "warning": "#fbbf24",
          "error": "#f87171",
        },
      },
    ],
  },
}