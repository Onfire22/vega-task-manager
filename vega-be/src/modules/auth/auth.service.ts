import jwt from 'jsonwebtoken';
import { ACCESS_TTL, REFRESH_TTL } from '../../constants';
import { setToRedis } from '../../lib/redis/utils';

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
