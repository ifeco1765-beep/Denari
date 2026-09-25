/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF4EC",
          100: "#FFE1C4",
          300: "#FFBC7A",
          500: "#FF8E28",
          600: "#F2760C",
          700: "#C95F06",
        },
        ink: {
          900: "#14151A",
          700: "#3A3B45",
          500: "#6B6C77",
          300: "#A5A6B0",
          100: "#E7E7EC",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#FAF9F7",
        },
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(20, 21, 26, 0.06)",
      },
    },
  },
  plugins: [],
}

