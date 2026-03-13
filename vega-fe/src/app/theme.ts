import { createTheme, type MantineColorsTuple } from '@mantine/core';

const violet: MantineColorsTuple = [
	'#EEEDFE', // 0
	'#CECBF6', // 1
	'#AFA9EC', // 2
	'#9590E8', // 3
	'#7F77DD', // 4
	'#6860D4', // 5
	'#5046e5', // 6 ← primary (buttons, links, focus rings)
	'#4139C4', // 7
	'#3C3489', // 8
	'#26215C', // 9
];

const indigo: MantineColorsTuple = [
	'#EEF0FE',
	'#D5D9FB',
	'#B3BAF7',
	'#9199F2',
	'#7179ED',
	'#5560E8',
	'#4752E3',
	'#3A44CC',
	'#3039B5',
	'#262E9E',
];

const amber: MantineColorsTuple = [
	'#FAEEDA',
	'#FAD9A0',
	'#F7C160',
	'#F5AE38',
	'#F59E0b',
	'#D98A06',
	'#BA7517',
	'#9B5F0F',
	'#633806',
	'#412402',
];

const purple: MantineColorsTuple = [
	'#F5EFFE',
	'#E9D8FC',
	'#D5B8F9',
	'#C395F6',
	'#C084FC',
	'#A855F7',
	'#9333EA',
	'#7E22CE',
	'#6B21A8',
	'#581C87',
];

const teal: MantineColorsTuple = [
	'#E1F5EE',
	'#A7E9D0',
	'#6EDDB2',
	'#34d399',
	'#1D9E75',
	'#178060',
	'#0F6E56',
	'#085041',
	'#054D3C',
	'#04342C',
];

// Просрочено / ошибки
const red: MantineColorsTuple = [
	'#FCEBEB',
	'#F7C1C1',
	'#F09595',
	'#EC6E6E',
	'#E24B4A',
	'#CC3333',
	'#f87171',
	'#A32D2D',
	'#791F1F',
	'#501313',
];

// Теги: BE
const green: MantineColorsTuple = [
	'#EAF3DE',
	'#C0DD97',
	'#9DD45D',
	'#7EC235',
	'#639922',
	'#4E7B18',
	'#3B6D11',
	'#2D570C',
	'#27500A',
	'#173404',
];

const dark: MantineColorsTuple = [
	'#C9C9C9', // 0 — самый светлый текст на тёмном фоне
	'#B8B8B8', // 1
	'#828282', // 2
	'#696969', // 3
	'#424242', // 4 — border tertiary
	'#2e2e2e', // 5 — border secondary
	'#1e1e1e', // 6 — surface (карточки, дропдауны)
	'#181818', // 7 — sidebar / панели
	'#111111', // 8 — основной фон страницы
	'#0e0e0e', // 9 — topbar / самый тёмный
];

export const theme = createTheme({
	primaryColor: 'violet',
	primaryShade: { light: 6, dark: 5 },

	colors: {
		violet,
		indigo,
		amber,
		purple,
		teal,
		red,
		green,
		dark,
	},

	fontSizes: {
		xs: '11px',
		sm: '12px',
		md: '13px',
		lg: '15px',
		xl: '18px',
	},
	lineHeights: {
		xs: '1.4',
		sm: '1.5',
		md: '1.7',
		lg: '1.8',
		xl: '1.9',
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
		md: '12px',
		lg: '16px',
		xl: '24px',
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
							'--button-color': 'rgba(255,255,255,0.75)',
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
		Select: {
			defaultProps: { radius: 'md' },
			vars: () => ({
				input: {
					'--input-bd-focus': 'rgba(59,130,246,0.6)',
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
		MultiSelect: {
			defaultProps: { radius: 'md' },
			vars: () => ({
				input: {
					'--input-bd-focus': 'rgba(59,130,246,0.6)',
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
		Card: {
			defaultProps: { radius: 'lg', padding: 'md' },
			styles: {
				root: {
					backgroundColor: 'rgba(255,255,255,0.04)',
					border: '0.5px solid rgba(255,255,255,0.08)',
				},
			},
		},
		Modal: {
			defaultProps: { radius: 'lg', centered: true },
			styles: {
				content: {
					backgroundColor: '#1e1e1e',
					border: '0.5px solid rgba(255,255,255,0.1)',
				},
				header: {
					backgroundColor: '#1e1e1e',
				},
			},
		},
		AppShell: {
			styles: {
				navbar: {
					backgroundColor: '#111111',
					borderRight: '0.5px solid rgba(255,255,255,0.06)',
				},
				header: {
					backgroundColor: '#0e0e0e',
					borderBottom: '0.5px solid rgba(255,255,255,0.08)',
				},
				main: {
					backgroundColor: '#111111',
				},
			},
		},
		Tabs: {
			defaultProps: { variant: 'underline' },
			styles: (theme: any) => ({
				tab: {
					fontSize: '13px',
					color: 'rgba(255,255,255,0.4)',
					'&[data-active]': {
						color: 'rgba(255,255,255,0.9)',
						borderBottomColor: theme.colors.violet[6],
					},
				},
			}),
		},
		Menu: {
			defaultProps: { radius: 'md' },
			styles: {
				dropdown: {
					backgroundColor: '#1e1e1e',
					border: '0.5px solid rgba(255,255,255,0.12)',
				},
				item: {
					fontSize: '13px',
					color: 'rgba(255,255,255,0.75)',
					'&:hover': {
						backgroundColor: 'rgba(255,255,255,0.05)',
					},
				},
			},
		},
		Tooltip: {
			defaultProps: { radius: 'sm' },
			styles: {
				tooltip: {
					fontSize: '12px',
					backgroundColor: '#2e2e2e',
					color: 'rgba(255,255,255,0.82)',
					border: '0.5px solid rgba(255,255,255,0.1)',
				},
			},
		},
		Avatar: {
			defaultProps: { radius: 'xl' },
		},
		Progress: {
			defaultProps: { radius: 'xs' },
			styles: {
				root: {
					backgroundColor: 'rgba(255,255,255,0.07)',
				},
			},
		},
		ActionIcon: {
			defaultProps: { variant: 'subtle', radius: 'md' },
		},
		Divider: {
			styles: {
				root: {
					borderColor: 'rgba(255,255,255,0.06)',
				},
			},
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
