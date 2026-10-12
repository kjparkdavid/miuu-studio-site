/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "var(--font-ko)", "system-ui", "sans-serif"],
        body: ["var(--font-display)", "var(--font-ko)", "system-ui", "sans-serif"],
      },
      // Same brand tokens as miuunote.site, taken from the app's own UI
      colors: {
        ink: "#422F25", // cocoa, the same brown as the logo and the characters' outlines
        violet: { DEFAULT: "#6A1CF6", deep: "#4A12B8", soft: "#A77EFF" },
        lilac: "#EFE9FF",
        canvas: "#FAF8FF",
        blush: "#FFE9F1",
        mint: "#D7F5E4",
        sky: "#DCEBFF",
        butter: "#FFF3C9",
        night: "#1B1838",
      },
      boxShadow: {
        card: "0 1px 0 rgba(43, 34, 64, 0.04), 0 12px 32px -16px rgba(43, 34, 64, 0.18)",
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        twinkle: { "0%, 100%": { opacity: "0.25" }, "50%": { opacity: "1" } },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
