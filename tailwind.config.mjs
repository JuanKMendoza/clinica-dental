/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Tu paleta primary original (se mantiene por seguridad)
        primary: {
          50: '#eff6ff',
          // ... (tus otros colores) ...
          900: '#1e3a8a',
        },
        // 🔥 LA NUEVA PALETA DINÁMICA (Aquí ocurre la magia)
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
          50: 'rgb(var(--color-brand) / 0.05)',  // Fondo muy suave
          100: 'rgb(var(--color-brand) / 0.1)',  // Fondo suave
          200: 'rgb(var(--color-brand) / 0.2)',  // Bordes suaves
          300: 'rgb(var(--color-brand) / 0.3)',
          400: 'rgb(var(--color-brand) / 0.6)',
          500: 'rgb(var(--color-brand) / 0.8)',
          600: 'rgb(var(--color-brand) / 1)',    // COLOR PRINCIPAL (Botones)
          700: 'rgb(var(--color-brand) / 0.9)',  // Hover
          800: 'rgb(var(--color-brand) / 0.95)', // Active
          900: 'rgb(var(--color-brand) / 1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}