/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        panel: "#ffffff",
        line: "#d8dee9",
        vista: "#2f6f73",
        amber: "#b7791f"
      },
      boxShadow: {
        surface: "0 10px 24px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
}
