import { Request, Response, NextFunction } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { generateToken } from './auth.service';
import { REFRESH_TTL, RESPONSE_STATUSES } from '../../constants';
import { AppError } from '../../errors/errors';
import bcrypt from 'bcryptjs';
import { IAuthRes, TSignUpBody, TSignInBody, TUserByEmailBody, TokenPayload } from './auth.types';
import { generateName } from './utils';
import jwt from 'jsonwebtoken';
import { getFromRedis } from '../../lib/redis/utils';

export const signupUser = async (req: Request<{}, {}, TSignUpBody>, res: Response<IAuthRes>, next: NextFunction) => {
	try {
		const userData = req.body;

		const salt = await bcrypt.genSalt(10);

		userData.password = await bcrypt.hash(userData.password, salt);

		const newUser = await prismaAppClient.$transaction(async (tx) => {
			const users = await tx.user.findMany({
				select: {
					userName: true,
				},
			});

			const userNames = users.map((user) => user.userName);

			const userName = generateName(userData.name, userData.secondName, userNames);

			return tx.user.create({
				data: { ...userData, userName },
				select: {
					email: true,
					id: true,
					name: true,
					secondName: true,
					userSpecialisationUuid: true,
					userName: true,
				},
			});
		});

		const token = await generateToken(newUser.id);

		if (!token) {
			return new AppError('Failed to generate token', RESPONSE_STATUSES.notAuthorised);
		}

		res.status(RESPONSE_STATUSES.authorised)
			.cookie('refreshToken', token.refreshToken, {
				httpOnly: true,
				maxAge: REFRESH_TTL,
			})
			.json({ accessToken: token.accessToken });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const signInUser = async (req: Request<{}, {}, TSignInBody>, res: Response<IAuthRes>, next: NextFunction) => {
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

		const token = await generateToken(user.id);

		if (!token) {
			return new AppError('Failed to generate token', RESPONSE_STATUSES.notAuthorised);
		}

		res.status(RESPONSE_STATUSES.authorised)
			.cookie('refreshToken', token.refreshToken, {
				httpOnly: true,
				maxAge: REFRESH_TTL,
			})
			.json({ accessToken: token.accessToken });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.notAuthorised));
	}
};

export const getUserByEmail = async (req: Request<{}, {}, TUserByEmailBody>, res: Response, next: NextFunction) => {
	try {
		const { email } = req.body;

		const user = await prismaAppClient.user.findUnique({
			where: { email },
		});

		if (user) {
			return next(new AppError('Пользователь с таким email уже существует', RESPONSE_STATUSES.iternalError));
		}

		res.status(200).json({ success: true });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.notAuthorised));
	}
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { refreshToken } = req.cookies;

		if (!refreshToken) {
			return res.status(401).json({ message: 'No refresh token' });
		}

		let payload: TokenPayload;
		try {
			payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as TokenPayload;
		} catch {
			return res.status(401).json({ message: 'Invalid refresh token' });
		}

		const stored = await getFromRedis(`refresh:${payload.id}`);
		if (stored !== refreshToken) {
			return res.status(401).json({ message: 'Refresh token revoked' });
		}

		const token = await generateToken(payload.id);

		res.cookie('refreshToken', token?.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: REFRESH_TTL,
		});

		res.json({ accessToken: token?.accessToken });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.notAuthorised));
	}
};

export const logOutUser = async (req: Request, res: Response, next: NextFunction) => {
	res.clearCookie('refreshToken', {
		httpOnly: true,
	}).json({ success: true });
};
