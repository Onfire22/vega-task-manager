import { teal, violet } from './constants.ts';
import { createTheme } from '@mantine/core';

export const THEME = createTheme({
	colors: { teal, violet },
	primaryColor: 'teal',
	primaryShade: { light: 6, dark: 4 },

	other: {
		colorBody: '#111318',
		colorSurface: '#1A1D23',
		colorBorder: '#2A2E38',
		colorText: '#E8EBF0',
		colorDimmed: '#9BA3AF',
		colorSuccess: '#2EA043',
		colorError: '#E05050',
		colorWarning: '#D4A017',
	},
	components: {
		Input: {
			styles: {
				input: {
					backgroundColor: 'var(--color-body)',
					borderColor: 'var(--color-border)',
					color: 'var(--color-text)',
				},
			},
		},
	},
});
