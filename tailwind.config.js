/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: {
          200: "#BFFFF6",
          300: "#4FF9F2",
          400: "#1BEE63",
          500: "#03C9C9",
          600: "#00A0A3",
          700: "#047C81",
        },
        secondary: {
          200: "#FFC478",
          300: "#FFC152",
          400: "#FFAB16",
          500: "#FF8F00",
          600: "#CC6902",
          700: "#A1510B",
        },
        accent: {
          200: "#9DDAF9",
          300: "#1EB5FF",
          400: "#0698FF",
          500: "#007DF0",
          600: "#0865C5",
          700: "#0D579B",
        },
        natural: {
          black: "#131313",
          gray1: "#3D3D3D",
          gray2: "#797979",
          gray3: "#B7B7B7",
          gray4: "#E6E6E6",
          white: "#FFFFFF",
        },
        state: {
          success: {
            green1: "#00DD16",
            green2: "#00FF1A",
            green3: "#50FF61",
          },
          error: {
            red1: "#DD0000",
            red2: "#FF0000",
            red3: "#FF5050",
          },
          danger: {
            yellow1: "#F2D806",
            yellow2: "#FFF500",
          },
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      // Set Vazir as the default sans font
      fontFamily: {
        sans: ["Vazirmatn", "sans-serif"],
      },
    },
  },
  plugins: ["tailwindcss-animate"],
};
