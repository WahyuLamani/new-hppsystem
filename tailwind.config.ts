import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      "colors": {
          "on-tertiary-fixed-variant": "#6d390c",
          "inverse-surface": "#2d3133",
          "on-primary-fixed-variant": "#004f56",
          "on-tertiary-fixed": "#301400",
          "surface-container-lowest": "#ffffff",
          "surface-container": "#eceef0",
          "tertiary-fixed": "#ffdcc5",
          "surface-container-low": "#f2f4f6",
          "on-primary-fixed": "#001f23",
          "tertiary-fixed-dim": "#ffb783",
          "on-surface-variant": "#3e494a",
          "secondary-fixed-dim": "#98cdf2",
          "on-secondary-fixed-variant": "#064c6b",
          "on-primary": "#ffffff",
          "primary-fixed": "#9ff0fb",
          "surface-dim": "#d8dadc",
          "on-error-container": "#93000a",
          "background": "#f7f9fb",
          "tertiary": "#713d10",
          "on-background": "#191c1e",
          "on-error": "#ffffff",
          "on-surface": "#191c1e",
          "outline-variant": "#bec8ca",
          "surface-bright": "#f7f9fb",
          "on-secondary": "#ffffff",
          "outline": "#6f797a",
          "surface-container-highest": "#e0e3e5",
          "primary-fixed-dim": "#82d3de",
          "on-secondary-fixed": "#001e2e",
          "error": "#ba1a1a",
          "surface-container-high": "#e6e8ea",
          "on-secondary-container": "#255f80",
          "inverse-on-surface": "#eff1f3",
          "primary-container": "#006d77",
          "surface-variant": "#e0e3e5",
          "inverse-primary": "#82d3de",
          "on-primary-container": "#9becf7",
          "surface": "#f7f9fb",
          "primary": "#00535b",
          "surface-tint": "#006972",
          "secondary-container": "#a3d8fe",
          "error-container": "#ffdad6",
          "secondary": "#2b6485",
          "on-tertiary-container": "#ffd7bd",
          "on-tertiary": "#ffffff",
          "tertiary-container": "#8e5426",
          "secondary-fixed": "#c7e7ff"
      },
      "borderRadius": {
          "DEFAULT": "0.125rem",
          "lg": "0.25rem",
          "xl": "0.5rem",
          "full": "0.75rem"
      },
      "fontFamily": {
          "headline": ["Manrope"],
          "body": ["Inter"],
          "label": ["Inter"]
      }
    },
  },
  plugins: [],
} satisfies Config

export default config