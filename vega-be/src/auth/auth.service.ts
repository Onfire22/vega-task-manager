import jwt from 'jsonwebtoken';
import { DAY } from '../lib/constants';

export const generateToken = (id: string = ''): string => {
	if (!id) return '';

	return jwt.sign({ id }, process.env.JSW_SECRET as string, {
		expiresIn: DAY,
	});
};
