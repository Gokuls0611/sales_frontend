/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			satoshi: ['Satoshi', 'sans-serif'],
  			inter: ['Inter', 'sans-serif']
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			active: {
  				DEFAULT: 'bg-green'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			transparent: 'transparent',
  			current: 'currentColor',
  			white: '#ffffff',
  			purple: '#3f3cbb',
  			midnight: '#121063',
  			metal: '#565584',
  			tahiti: '#3ab7bf',
  			silver: '#ecebff',
  			'bubble-gum': '#ff77e9',
  			bermuda: '#78dcca',
  			green: {
  				active: '#22c55e',
  				default: '#16a34a'
  			},
  			black: '#1e1e1e',
  			red: {
  				DEFAULT: 'red',
  				active: '#dc2626'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		backgroundImage: {
  			customgradient: 'linear-gradient(180deg, #DB4E66 0%, #A24688 39.57%, #4E3ABA 100%)'
  		}
  	},
  	screens: {
  		sm: '480px',
  		md: '768px',
  		lg: '976px',
  		xl: '1440px'
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
	function ({ addComponents }) {
		addComponents({
			'.abc[data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb': {
				display: 'none', // Hides the scrollbar thumb
			  },
			  '.abc[data-radix-scroll-area-viewport]': {
				scrollbarWidth: 'none', // For Firefox
				'-ms-overflow-style': 'none', // For Internet Explorer and Edge
				'-webkit-overflow-scrolling': 'touch', // For iOS
			  },
		});
	},
  ],
  
}