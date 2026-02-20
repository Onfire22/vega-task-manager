import { Request, Response, NextFunction } from 'express';
import { prismaAppClient } from '../lib/prisma';
import { generateToken } from './auth.service';
import { DAY_IN_SECONDS, RESPONSE_STATUSES } from '../lib/constants';
import { AppError } from '../errors/errors';
import bcrypt from 'bcryptjs';

export const signupUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userData = req.body;

		const salt = await bcrypt.genSalt(10);

		userData.password = await bcrypt.hash(userData.password, salt);

		const newUser = await prismaAppClient.user.create({ data: userData });

		const token = generateToken(newUser.id);

		res.status(RESPONSE_STATUSES.authorised)
			.cookie('token', token, {
				httpOnly: true,
				maxAge: DAY_IN_SECONDS,
			})
			.json({ success: true });
	} catch (e) {
		next(new AppError('Iternal error', RESPONSE_STATUSES.iternalError));
	}
};

export const signInUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body;

		const user = await prismaAppClient.user.findUniqueOrThrow({
			where: { email },
		});

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			next(
				new AppError('Iternal error', RESPONSE_STATUSES.notAuthorised),
			);
			return;
		}

		const token = generateToken(user.id);

		res.status(RESPONSE_STATUSES.authorised)
			.cookie('token', token, {
				httpOnly: true,
				maxAge: DAY_IN_SECONDS,
			})
			.json({ success: true });
	} catch (e) {
		console.log(e);
		next(new AppError('Iternal error', RESPONSE_STATUSES.notAuthorised));
	}
};
