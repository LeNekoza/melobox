import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin';


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
      "palone": "#5A2F8E",
      "palone/70": "rgba(90, 47, 142, 0.7)",
      "paltwo": "#3C3545",
      "palthree": "#7C41C4",
      "palfour": "#D2C8DE",
      "palfive": "#2F184A",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
   require('@tailwindcss/forms'),
		plugin(function({addBase}) {
			 return addBase({
				'[type="search"]::-webkit-search-decoration': {display: 'none'},
				'[type="search"]::-webkit-search-cancel-button': {display: 'none'},
				'[type="search"]::-webkit-search-results-button': {display: 'none'},
				'[type="search"]::-webkit-search-results-decoration': {display: 'none'},
			})
		}),
  ],
}
export default config
