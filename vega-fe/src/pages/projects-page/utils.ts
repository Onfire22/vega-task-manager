import type { PluralOptions } from './types.ts';

export const pluralValue = (value: number, variants: PluralOptions, locale = 'ru-RU') => {
	const key = new Intl.PluralRules(locale).select(value);
	return variants[key as keyof typeof variants] || '';
};
