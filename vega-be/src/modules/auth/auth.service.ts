import bcrypt from 'bcryptjs';
import { prismaAppClient } from '../../lib/prisma';
import { generateName, generateToken } from './auth.utils';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../common/constants';
import { TokenPayload, TSignInBody, TSignUpBody } from './auth.types';
import jwt from 'jsonwebtoken';
import { deleteFromRedis, getFromRedis } from '../../lib/redis/utils';

const signupUser = async (userData: TSignUpBody) => {
	const salt = await bcrypt.genSalt(10);

	userData.password = await bcrypt.hash(userData.password, salt);

	const users = await prismaAppClient.user.findMany({
		select: {
			userName: true,
		},
	});
	console.log(users);

	const userNames = users.map((user) => user.userName);

	const userName = generateName(userData.name, userData.secondName, userNames);

	const newUser = await prismaAppClient.user.create({
		data: { ...userData, userName, isSuperUser: users.length === 0 },
		select: {
			email: true,
			uuid: true,
			name: true,
			secondName: true,
			userName: true,
			isSuperUser: true,
		},
	});

	const tokens = await generateToken(newUser.uuid);

	if (!tokens) {
		throw new AppError('Failed to generate token', RESPONSE_STATUSES.notAuthorised);
	}

	return tokens;
};

const signInUser = async ({ email, password }: TSignInBody) => {
	const user = await prismaAppClient.user.findUnique({
		where: { email },
		select: {
			email: true,
			uuid: true,
			name: true,
			secondName: true,
			password: true,
		},
	});

	if (!user) {
		throw new AppError('Email не найден', RESPONSE_STATUSES.notAuthorised);
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new AppError('Неправильный пароль', RESPONSE_STATUSES.notAuthorised);
	}

	const tokens = await generateToken(user.uuid);

	if (!tokens) {
		throw new AppError('Failed to generate token', RESPONSE_STATUSES.notAuthorised);
	}

	return tokens;
};

const getUserByEmail = async (email: string) => {
	const user = await prismaAppClient.user.findUnique({
		where: { email },
	});

	if (user) {
		throw new AppError('Пользователь с таким email уже существует', RESPONSE_STATUSES.internalError);
	}
};

const refreshUserToken = async (refreshToken: string) => {
	if (!refreshToken) {
		throw new AppError('No refresh token', RESPONSE_STATUSES.notAuthorised);
	}

	let payload: TokenPayload;
	try {
		payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as TokenPayload;
	} catch {
		throw new AppError('Invalid refresh token', RESPONSE_STATUSES.notAuthorised);
	}

	const stored = await getFromRedis(`refresh:${payload.id}`);
	if (stored !== refreshToken) {
		throw new AppError('Refresh token revoked', RESPONSE_STATUSES.notAuthorised);
	}

	return await generateToken(payload.id);
};

const logOutUser = async (refreshToken: string) => {
	if (refreshToken) {
		const payload = jwt.decode(refreshToken) as TokenPayload;
		await deleteFromRedis(`refresh:${payload.id}`);
	}
};

export const authService = { signupUser, signInUser, getUserByEmail, refreshUserToken, logOutUser };
