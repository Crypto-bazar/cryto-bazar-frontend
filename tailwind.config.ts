import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,tsx, jsx}', './app/**/*.{js, ts, tsx, jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#ef996b',
          peach: 'rgb(255 234 214)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
