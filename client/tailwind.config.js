/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Direct named palette tokens from design spec
        ivory: {
          warm: "#F7F6F2",
          surface: "#FFFFFF",
        },
        ink: {
          midnight: "#17191F",
          deep: "#0F1115",
        },
        slate: {
          grey: "#747782",
          muted: "#9FA2AC",
        },
        border: {
          soft: "#E7E5DF",
          dark: "#2D303A",
          DEFAULT: "var(--border-color)",
        },
        cobalt: {
          muted: "#5267D8",
          deep: "#3549B5",
          accent: "#8190F0",
          hover: "#6B7DE8",
        },
        // Semantic theme tokens
        background: "var(--bg-main)",
        surface: {
          DEFAULT: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
        },
        foreground: "var(--text-primary)",
        muted: {
          DEFAULT: "var(--text-muted)",
          foreground: "var(--text-secondary)",
        },
      },
      fontFamily: {
        display: [
          '"Plus Jakarta Sans"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'monospace',
        ],
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(23, 25, 31, 0.04)',
        'surface': '0 4px 12px -2px rgba(23, 25, 31, 0.06), 0 2px 6px -1px rgba(23, 25, 31, 0.03)',
        'elevated': '0 12px 28px -6px rgba(23, 25, 31, 0.08), 0 4px 12px -2px rgba(23, 25, 31, 0.04)',
        'dark-surface': '0 4px 14px -2px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
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
      },
    },
  },
  plugins: [],
}
