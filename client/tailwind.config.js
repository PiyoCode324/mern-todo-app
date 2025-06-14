// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Reactコンポーネントのパス
  ],
  darkMode: 'class', // 👈 追加
  theme: {
    extend: {},
  },
  plugins: [],
}
