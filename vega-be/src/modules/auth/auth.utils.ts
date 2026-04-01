import { transliterate } from 'transliteration';
import jwt from 'jsonwebtoken';
import { ACCESS_TTL, REFRESH_TTL } from '../../constants';
import { setToRedis } from '../../lib/redis/utils';

export const generateName = (name: string, secondName: string, nickNames: Array<string>, step = 1): string => {
	const nameLetter = transliterate(name).toLowerCase().slice(0, step);
	const surname = transliterate(secondName).toLowerCase();

	const result = `${surname}.${nameLetter}`;

	if (nickNames.includes(result)) {
		return generateName(name, secondName, nickNames, step + 1);
	}

	return result;
};

export const generateToken = async (id: string = '') => {
	if (!id) return null;

	const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET as string, {
		expiresIn: ACCESS_TTL,
	});

	const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, {
		expiresIn: REFRESH_TTL,
	});

	await setToRedis(`refresh:${id}`, refreshToken, REFRESH_TTL);

	return { accessToken, refreshToken };
};
