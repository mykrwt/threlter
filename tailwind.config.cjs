const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'var(--color-primary)',
					light: 'var(--color-primary-light)',
					dark: 'var(--color-primary-dark)'
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					light: 'var(--color-accent-light)',
					dark: 'var(--color-accent-dark)'
				},
				orange: {
					DEFAULT: 'var(--color-orange)'
				},
				blue: {
					dark: 'var(--color-blue-dark)',
					darker: 'var(--color-blue-darker)',
					darkest: 'var(--color-blue-darkest)'
				},
				surface: {
					DEFAULT: 'var(--color-surface)',
					light: 'var(--color-surface-light)'
				},
				'text-primary': 'var(--color-text-primary)',
				'text-secondary': 'var(--color-text-secondary)',
				'text-muted': 'var(--color-text-muted)'
			},
			fontFamily: {
				sans: 'var(--font-sans)',
				headline: 'var(--font-headline)',
				segments: 'var(--font-segments)'
			},
			backdropBlur: {
				xs: '2px'
			}
		}
	},

	plugins: []
}

module.exports = config
