import { prismaAppClient } from '../../lib/prisma';
import { Prisma } from '../../generated/prisma/client';
import { TUpdateUserBody, TUpdateUserPasswordBody, TUserListBody } from './user.types';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import bcrypt from 'bcryptjs';

const getCurrentUser = async (userUuid: string) => {
	const user = await prismaAppClient.user.findUnique({
		where: { id: userUuid },
		select: {
			id: true,
			email: true,
			name: true,
			secondName: true,
			userName: true,
			userSpecialisation: {
				select: {
					id: true,
					label: true,
					key: true,
				},
			},
		},
	});

	if (!user) {
		throw new AppError('User not found', RESPONSE_STATUSES.notFound);
	}

	return user;
};

const getUserList = ({ filters }: TUserListBody) => {
	const filterData: Prisma.UserWhereInput = {
		...(filters?.withoutUser ? { id: { not: filters.withoutUser } } : {}),
		memberships: {
			...(filters?.withOutProject ? { none: { projectUuid: filters.withOutProject } } : {}),
			...(filters?.withProject ? { some: { projectUuid: filters.withProject } } : {}),
		},
	};

	if (filters.search) {
		filterData.OR = [
			{ name: { contains: filters.search, mode: 'insensitive' } },
			{ secondName: { contains: filters.search, mode: 'insensitive' } },
		];
	}

	return prismaAppClient.user.findMany({
		...(filters ? { where: filterData } : {}),
		select: {
			id: true,
			name: true,
			secondName: true,
		},
	});
};

const updateUser = (userData: TUpdateUserBody, userUuid: string) => {
	const updateData: Prisma.UserUpdateInput = {};

	if (userData.name) {
		updateData.name = userData.name;
	}

	if (userData.secondName) {
		updateData.secondName = userData.secondName;
	}

	if (userData.userName) {
		updateData.userName = userData.userName;
	}

	if (userData.userSpecialisationUuid) {
		updateData.userSpecialisation = {
			connect: { id: userData.userSpecialisationUuid },
		};
	}

	return prismaAppClient.user.update({
		where: { id: userUuid },
		data: updateData,
	});
};

const updateUserPassword = async (passwords: TUpdateUserPasswordBody, userUuid: string) => {
	const { currentPassword, newPassword } = passwords;

	const user = await prismaAppClient.user.findUnique({
		where: { id: userUuid },
		select: { password: true },
	});

	if (!user) {
		throw new AppError('User not found', RESPONSE_STATUSES.notFound);
	}

	const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

	if (!isPasswordMatch) {
		throw new AppError('Вы ввели неправильный пароль', RESPONSE_STATUSES.badRequest);
	}

	const salt = await bcrypt.genSalt(10);

	const cryptedPassword = await bcrypt.hash(newPassword, salt);

	await prismaAppClient.user.update({
		where: { id: userUuid },
		data: { password: cryptedPassword },
	});
};

export const userService = { getCurrentUser, getUserList, updateUser, updateUserPassword };
