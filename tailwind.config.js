/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: '#F8F8F8',
        'light-color': '#3D3D3D',
        dark: '#141414',
        'dark-light': '#262626',
        'danger-light': '#FDE1E1',
        danger: '#F04438',
        /** Theme Colors */
        primary: 'var(--theme-primary)',
        'primary-200': 'var(--theme-primary-200)',
        'primary-850': 'var(--theme-primary-850)',
        'primary-950': 'var(--theme-primary-950)',
        secondary: 'var(--theme-secondary)',
        'secondary-light': 'var(--theme-secondary-light)',
      },
    },
  },
  plugins: [],
};
