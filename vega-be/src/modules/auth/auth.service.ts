import jwt from 'jsonwebtoken';
import { HOUR } from '../../constants';

export const generateToken = (id: string = ''): string => {
	if (!id) return '';

	return jwt.sign({ id }, process.env.JWT_SECRET as string, {
		expiresIn: HOUR,
	});
};
