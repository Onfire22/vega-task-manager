import type { DictionaryKey, IRequirement } from './types.ts';
import { MINIMAL_PASSWORD_LENGTH } from './constants.ts';

export const getPasswordStrength = (password: string, requirements: Array<IRequirement>): number => {
	if (!password.length) return 0;

	let multiplier = password.length > MINIMAL_PASSWORD_LENGTH ? 0 : 1;

	requirements.forEach((requirement) => {
		if (!requirement.regex.test(password)) {
			multiplier += 1;
		}
	});

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

const generateRandomNumber = (min: number = 0, max: number = 1): number => {
	return Math.floor(Math.random() * (max - min) + min);
};

export const generateRandomPassword = () => {
	const dictionary: Record<DictionaryKey, string> = {
		lowerCaseLetters: 'abcdefghijklmnopqrstuvwxyz',
		upperCaseLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		symbols: '$&+,:;=?@#|<>.^*()%!-',
		numbers: '0123456789',
	};

	const requirements: Array<DictionaryKey> = Object.keys(dictionary) as DictionaryKey[];

	const password = new Array(generateRandomNumber(9, 12)).fill(null);

	const { result } = password.reduce(
		(acc, _item, index) => {
			const randomDictKey = requirements[generateRandomNumber(0, requirements.length)];

			const randomReq = dictionary[randomDictKey];

			if (index === password.length - requirements.length) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const unusedReqs = Object.entries(acc.counts).filter(([_, value]) => Boolean(!value));
				unusedReqs.forEach(([key]) => {
					const randomReq = dictionary[key as DictionaryKey];
					acc.result.push(randomReq[generateRandomNumber(0, randomReq.length - 1)]);
					acc.counts[key] += 1;
				});
			} else {
				const randomSymbol = randomReq[generateRandomNumber(0, randomReq.length - 1)];

				acc.result.push(randomSymbol);
				acc.counts[randomDictKey] += 1;
			}

			return acc;
		},
		{ result: [], counts: { lowerCaseLetters: 0, upperCaseLetters: 0, symbols: 0, numbers: 0 } },
	);

	for (let i = result.length - 1; i > 0; i--) {
		const j = generateRandomNumber(0, i);
		[result[i], result[j]] = [result[j], result[i]];
	}

	return result.join('');
};
