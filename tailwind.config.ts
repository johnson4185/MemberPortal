import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Dark Ocean Blue Theme
        "ocean-deep": "#020e1a",
        "ocean-dark": "#041628",
        "ocean-mid": "#0a3352",
        "ocean-base": "#0e5c8a",
        "ocean-bright": "#0ea5d8",
        "ocean-light": "#38bdf8",
        "ocean-glow": "#7dd3fc",
        "ocean-mist": "#e0f4fd",
        
        primary: {
          DEFAULT: "#0e5c8a",
          dark: "#0a3352",
          bright: "#0ea5d8",
        },
        accent: "#0891b2",
        
        // Neutral Colors - Semantic Naming
        background: "#f0f7fc",
        "surface-alt": "#f4fafd",
        card: "#ffffff",
        "text-primary": "#020e1a",
        "text-mid": "#2c4a60",
        "text-secondary": "#6b90a8",
        "text-soft": "#6b90a8",
        "text-muted": "#8aa8bc",
        border: "#d1eaf7",
        "border-mid": "#b0d8ef",
        
        // Status Colors
        success: "#059669",
        "success-light": "#d1fae5",
        warning: "#d97706",
        "warning-light": "#fef3c7",
        danger: "#e11d48",
        "danger-light": "#ffe4e6",
        rose: "#e11d48",
        amber: "#d97706",
        info: "#3B82F6",
        teal: "#0891b2",
        "teal-light": "#cffafe",
        
        // Legacy ocean object
        ocean: {
          DEFAULT: "#0e5c8a",
          dark: "#0a3352",
        },
      },
      fontFamily: {
        'dm-sans': ["'DM Sans'", "sans-serif"],
        outfit: ["'Outfit'", "sans-serif"],
        sans: ["'Outfit'", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Typography Scale
        'page-title': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700', letterSpacing: '-0.025em' }],
        'section-title': ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        'card-title': ['0.9375rem', { lineHeight: '1.375rem', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'stat-value': ['2rem', { lineHeight: '1', fontWeight: '700', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        DEFAULT: '0.875rem', // 14px
        lg: '0.875rem', // 14px
        xl: '1rem',
        sm: '0.5625rem', // 9px
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(2, 14, 26, 0.04)',
        DEFAULT: '0 1px 4px rgba(2,14,26,.06), 0 4px 20px rgba(2,14,26,.07)',
        md: '0 4px 6px -1px rgba(2, 14, 26, 0.1), 0 2px 4px -2px rgba(2, 14, 26, 0.1)',
        lg: '0 8px 32px rgba(2,14,26,.14)',
        soft: '0 2px 8px rgba(2, 14, 26, 0.08)',
        card: '0 1px 4px rgba(2,14,26,.06), 0 4px 20px rgba(2,14,26,.07)',
        hover: '0 8px 32px rgba(2,14,26,.14)',
        blue: '0 4px 24px rgba(14,92,138,.18)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
