import { createTheme, type MantineColorsTuple } from '@mantine/core';

const violet: MantineColorsTuple = [
	'#EEEDFE',
	'#CECBF6',
	'#AFA9EC',
	'#9590E8',
	'#7F77DD',
	'#6860D4',
	'#5046e5', // 6 ← primary
	'#4139C4',
	'#3C3489',
	'#26215C',
];

const indigo: MantineColorsTuple = [
	'#EEF0FE',
	'#EEF0FE',
	'#B3BAF7',
	'#B3BAF7',
	'#7179ED',
	'#7179ED',
	'#4752E3', // 6
	'#3A44CC',
	'#3A44CC',
	'#262E9E',
];

const amber: MantineColorsTuple = [
	'#FAEEDA',
	'#FAEEDA',
	'#F7C160',
	'#F7C160',
	'#F59E0B',
	'#F59E0B',
	'#D98A06', // 6
	'#BA7517',
	'#633806',
	'#412402',
];

const grape: MantineColorsTuple = [
	'#F5EFFE',
	'#F5EFFE',
	'#D5B8F9',
	'#D5B8F9',
	'#C084FC',
	'#C084FC',
	'#A855F7', // 6
	'#7E22CE',
	'#6B21A8',
	'#581C87',
];

const teal: MantineColorsTuple = [
	'#E1F5EE',
	'#E1F5EE',
	'#6EDDB2',
	'#6EDDB2',
	'#34D399',
	'#34D399',
	'#1D9E75', // 6
	'#0F6E56',
	'#085041',
	'#04342C',
];

// Просрочено / ошибки
const red: MantineColorsTuple = [
	'#FCEBEB',
	'#FCEBEB',
	'#F09595',
	'#F09595',
	'#F87171',
	'#F87171',
	'#E24B4A', // 6
	'#A32D2D',
	'#791F1F',
	'#501313',
];

const dark: MantineColorsTuple = [
	'#C9C9C9', // 0 — текст на тёмном
	'#B8B8B8', // 1
	'#828282', // 2 — muted текст
	'#696969', // 3
	'#3a3a3a', // 4 — border tertiary
	'#2e2e2e', // 5 — border secondary
	'#1e1e1e', // 6 — surface: карточки, дропдауны, кнопки default
	'#181818', // 7 — sidebar
	'#141414', // 8 — основной фон
	'#0e0e0e', // 9 — topbar
];

export const theme = createTheme({
	primaryColor: 'violet',
	primaryShade: { light: 6, dark: 5 },

	colors: {
		violet,
		indigo,
		amber,
		grape,
		teal,
		red,
		dark,
	},

	fontSizes: {
		xs: '12px',
		sm: '13px',
		md: '16px',
		lg: '16px',
		xl: '20px',
	},
	lineHeights: {
		xs: '1.4',
		sm: '1.5',
		md: '1.6',
		lg: '1.7',
		xl: '1.8',
	},
	radius: {
		xs: '4px',
		sm: '6px',
		md: '8px',
		lg: '10px',
		xl: '16px',
	},

	defaultRadius: 'md',
	shadows: {
		xs: 'none',
		sm: 'none',
		md: 'none',
		lg: 'none',
		xl: 'none',
	},
	spacing: {
		xs: '4px',
		sm: '8px',
		md: '14px',
		lg: '20px',
		xl: '28px',
	},

	components: {
		Button: {
			defaultProps: {
				radius: 'md',
				variant: 'default',
			},
			vars: (_theme: any, props: any) => {
				if (props.variant === 'default') {
					return {
						root: {
							'--button-bg': '#111',
							'--button-hover': '#2a2a2a',
							'--button-bd': '0.5px solid rgba(255,255,255,0.35)',
							'--button-color': '#fff',
						},
					};
				}
				if (props.variant === 'accent') {
					return {
						root: {
							'--button-bg': '#3A44CC',
							'--button-hover': '#262E9E',
							'--button-color': '#fff',
						},
					};
				}
				return { root: {} };
			},
		},
		Badge: {
			defaultProps: { radius: 'sm', variant: 'light' },
			styles: {
				root: {
					fontWeight: 500,
					fontSize: '11px',
					textTransform: 'none',
					letterSpacing: 0,
					boxShadow: 'inset 0 0 0 1px var(--badge-color)',
				},
			},
		},
		TextInput: {
			defaultProps: { radius: 'md' },
			vars: () => ({
				input: {
					'--input-bd-focus': 'rgba(80,70,229,0.4)',
				},
			}),
			styles: {
				input: {
					fontSize: '13px',
					backgroundColor: 'rgba(255,255,255,0.05)',
					borderColor: 'rgba(255,255,255,0.09)',
				},
			},
		},
		Table: {
			defaultProps: { striped: false, highlightOnHover: true },
			styles: {
				th: {
					fontSize: '11px',
					fontWeight: 500,
					textTransform: 'uppercase' as const,
					letterSpacing: '0.05em',
					color: 'rgba(255,255,255,0.3)',
					borderBottom: '0.5px solid rgba(255,255,255,0.08)',
					paddingTop: '9px',
					paddingBottom: '9px',
				},
				td: {
					fontSize: '13px',
					borderBottom: '0.5px solid rgba(255,255,255,0.04)',
				},
			},
		},
		Modal: {
			defaultProps: { radius: 'lg', centered: true },
		},
		Tabs: {
			defaultProps: { variant: 'underline' },
			styles: {
				tab: {
					fontSize: '13px',
				},
			},
		},
		Menu: {
			defaultProps: { radius: 'md' },
		},
		Textarea: {
			defaultProps: { radius: 'md' },
			styles: {
				input: {
					fontSize: '13px',
					backgroundColor: 'rgba(255,255,255,0.04)',
					borderColor: 'rgba(255,255,255,0.1)',
				},
			},
		},
	},
});
