/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sui Brand Colors
        'sui': {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b8e0ff',
          300: '#7cc5ff',
          400: '#36a7ff',
          500: '#6c8eff', // Main Sui Blue
          600: '#4575eb',
          700: '#3b66db',
          800: '#3555b3',
          900: '#334c8d',
        },
        // Mint Accent Colors
        'mint': {
          50: '#f0fffe',
          100: '#ccfffe',
          200: '#99fffd',
          300: '#5cfff9',
          400: '#22f5ef',
          500: '#3de9e3', // Main Mint
          600: '#06b6d0',
          700: '#0e91a5',
          800: '#167286',
          900: '#1a5e70',
        },
        // Semantic Colors (CSS Variables)
        'border': 'hsl(var(--border))',
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'primary': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'secondary': {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        'destructive': {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        'muted': {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'accent': {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        'popover': {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        'card': {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'lg': 'var(--shadow-lg)',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      transitionDuration: {
        'theme': '150ms',
      },
      transitionTimingFunction: {
        'theme': 'ease-in-out',
      },
    },
  },
  plugins: [],
}

export default config