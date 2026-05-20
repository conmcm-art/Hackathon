/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 20px 50px -25px rgba(2, 132, 199, 0.25)',
      },
    },
  },
  plugins: [],
};
