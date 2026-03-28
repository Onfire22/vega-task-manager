import { Request, Response, NextFunction } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { ILocals } from '../../common/types';
import { IGetUserListRequestBody, IGetUserListResponse, IUpdateUserBody, IUserResponse } from './user.types';
import { Prisma } from '../../generated/prisma/client';
import bcrypt from 'bcryptjs';

export const getCurrentUser = async (req: Request, res: Response<IUserResponse, ILocals>, next: NextFunction) => {
	try {
		const id = res.locals?.user?.id;

		if (id) {
			const currentUser = await prismaAppClient.user.findUnique({
				where: { id },
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

			if (!currentUser) {
				return next(new AppError('User not found', RESPONSE_STATUSES.notFound));
			}

			res.status(RESPONSE_STATUSES.success).json({ currentUser });
		}
	} catch (e) {
		next(e);
	}
};

export const getUserList = async (
	req: Request<{}, {}, IGetUserListRequestBody>,
	res: Response<IGetUserListResponse>,
	next: NextFunction,
) => {
	try {
		const filters = req.body?.filters;

		const filterData = {
			...(filters?.withoutUser ? { id: { not: filters.withoutUser } } : {}),
			memberships: {
				...(filters?.withOutProject ? { none: { projectUuid: filters.withOutProject } } : {}),
				...(filters?.withProject ? { some: { projectUuid: filters.withProject } } : {}),
			},
		};

		const usersList = await prismaAppClient.user.findMany({
			...(filters ? { where: filterData } : {}),
			select: {
				id: true,
				name: true,
				secondName: true,
			},
		});

		res.status(RESPONSE_STATUSES.success).json({ usersList });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const updateUser = async (req: Request<{}, {}, IUpdateUserBody>, res: Response, next: NextFunction) => {
	const id = res.locals?.user?.id;

	const updateData: Prisma.UserUpdateInput = {};

	if (req.body.name) {
		updateData.name = req.body.name;
	}

	if (req.body.secondName) {
		updateData.secondName = req.body.secondName;
	}

	if (req.body.userSpecialisationUuid) {
		updateData.userSpecialisation = {
			connect: { id: req.body.userSpecialisationUuid },
		};
	}

	try {
		const newUser = await prismaAppClient.user.update({
			where: { id },
			data: updateData,
		});

		res.status(RESPONSE_STATUSES.success).json({ newUser });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const updateUserPassword = async (
	req: Request<{}, {}, { currentPassword: string; newPassword: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const currentUserId = res.locals?.user?.id;

		const { currentPassword, newPassword } = req.body;

		const user = await prismaAppClient.user.findUnique({
			where: { id: currentUserId },
			select: { password: true },
		});

		if (!user) {
			return next(new AppError('User not found', RESPONSE_STATUSES.notFound));
		}

		const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

		if (!isPasswordMatch) {
			return next(new AppError('Вы ввели неправильный пароль', RESPONSE_STATUSES.badRequest));
		}

		const salt = await bcrypt.genSalt(10);

		const cryptedPassword = await bcrypt.hash(newPassword, salt);

		await prismaAppClient.user.update({
			where: { id: currentUserId },
			data: { password: cryptedPassword },
		});

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
