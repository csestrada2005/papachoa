import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1100px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        papachoa: {
          cream: "hsl(var(--papachoa-cream))",
          magenta: "hsl(var(--papachoa-magenta))",
          yellow: "hsl(var(--papachoa-yellow))",
          coral: "hsl(var(--papachoa-coral))",
          blue: "hsl(var(--papachoa-blue))",
          "warm-brown": "hsl(var(--papachoa-warm-brown))",
          // Legacy aliases for compatibility
          terracotta: "hsl(var(--papachoa-coral))",
          "terracotta-light": "hsl(var(--papachoa-coral) / 0.3)",
          marigold: "hsl(var(--papachoa-yellow))",
          "marigold-light": "hsl(var(--papachoa-yellow) / 0.3)",
          indigo: "hsl(var(--papachoa-blue))",
          "indigo-light": "hsl(var(--papachoa-blue) / 0.3)",
          rose: "hsl(var(--papachoa-magenta))",
          "rose-light": "hsl(var(--papachoa-magenta) / 0.3)",
          jade: "hsl(var(--papachoa-blue))",
          "jade-light": "hsl(var(--papachoa-blue) / 0.3)",
          blush: "hsl(var(--papachoa-coral) / 0.4)",
          "blush-mid": "hsl(var(--papachoa-coral) / 0.6)",
          "blush-dark": "hsl(var(--papachoa-coral))",
          sky: "hsl(var(--papachoa-blue) / 0.5)",
          "sky-mid": "hsl(var(--papachoa-blue) / 0.7)",
          sage: "hsl(var(--papachoa-blue) / 0.3)",
          "sage-mid": "hsl(var(--papachoa-blue) / 0.6)",
          peach: "hsl(var(--papachoa-coral) / 0.4)",
        },
      },
      fontFamily: {
        display: ["Caveat", "cursive"],
        body: ["Lato", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;