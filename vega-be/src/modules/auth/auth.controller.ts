import { Request, Response, NextFunction } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { generateToken } from './auth.service';
import { HOUR_IN_MS, RESPONSE_STATUSES } from '../../constants';
import { AppError } from '../../errors/errors';
import bcrypt from 'bcryptjs';
import { ISignInReqBody, IAuthRes, ISignUpReqBody } from './auth.types';

export const signupUser = async (req: Request<{}, {}, ISignUpReqBody>, res: Response<IAuthRes>, next: NextFunction) => {
	try {
		const userData = req.body;

		const salt = await bcrypt.genSalt(10);

		userData.password = await bcrypt.hash(userData.password, salt);

		const newUser = await prismaAppClient.user.create({
			data: userData,
			select: {
				email: true,
				id: true,
				name: true,
				secondName: true,
			},
		});

		const token = generateToken(newUser.id);

		res.status(RESPONSE_STATUSES.authorised)
			.cookie('token', token, {
				httpOnly: true,
				maxAge: HOUR_IN_MS,
			})
			.json({ user: newUser });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const signInUser = async (req: Request<{}, {}, ISignInReqBody>, res: Response<IAuthRes>, next: NextFunction) => {
	try {
		const { email, password } = req.body;

		const user = await prismaAppClient.user.findUnique({
			where: { email },
			select: {
				email: true,
				id: true,
				name: true,
				secondName: true,
				password: true,
			},
		});

		if (!user) {
			next(new AppError('Email не найден', RESPONSE_STATUSES.notAuthorised));
			return;
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			next(new AppError('Неправильный пароль', RESPONSE_STATUSES.notAuthorised));
			return;
		}

		const token = generateToken(user.id);

		res.status(RESPONSE_STATUSES.authorised)
			.cookie('token', token, {
				httpOnly: true,
				maxAge: HOUR_IN_MS,
			})
			.json({
				user: { email: user.email, id: user.id, name: user.name, secondName: user.secondName },
			});
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.notAuthorised));
	}
};

export const logOutUser = async (req: Request, res: Response, next: NextFunction) => {
	res.clearCookie('token', {
		httpOnly: true,
	}).json({ success: true });
};
