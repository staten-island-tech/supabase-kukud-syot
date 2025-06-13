// tailwind.config.js
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: ['business'],
    darkTheme: 'business',
  },
}
