import { transliterate } from 'transliteration';

export const generateName = (name: string, secondName: string, nickNames: Array<string>, step = 1): string => {
	const nameLetter = transliterate(name).toLowerCase().slice(0, step);
	const surname = transliterate(secondName).toLowerCase();

	const result = `${surname}.${nameLetter}`;

	if (nickNames.includes(result)) {
		return generateName(name, secondName, nickNames, step + 1);
	}

	return result;
};
