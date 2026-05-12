import { Request, Response, NextFunction } from 'express';
import { RESPONSE_STATUSES } from '../../common/constants';
import { ILocals } from '../../common/types';
import {
	IGetUserListResponse,
	IUserResponse,
	TUpdateUserBody,
	TUpdateUserPasswordBody,
	TUserListBody,
} from './user.types';
import { userService } from './user.service';

export const getCurrentUser = async (req: Request, res: Response<IUserResponse, ILocals>, next: NextFunction) => {
	try {
		const currentUser = await userService.getCurrentUser(res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ currentUser });
	} catch (e) {
		next(e);
	}
};

export const getUserList = async (
	req: Request<{}, {}, TUserListBody>,
	res: Response<IGetUserListResponse>,
	next: NextFunction,
) => {
	try {
		const usersList = await userService.getUserList(req.body);

		res.status(RESPONSE_STATUSES.success).json({ usersList });
	} catch (e) {
		next(e);
	}
};

export const updateUser = async (req: Request<{}, {}, Partial<TUpdateUserBody>>, res: Response, next: NextFunction) => {
	try {
		const newUser = await userService.updateUser(req.body, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ newUser });
	} catch (e) {
		next(e);
	}
};

export const updateUserPassword = async (
	req: Request<{}, {}, TUpdateUserPasswordBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		await userService.updateUserPassword(req.body, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(e);
	}
};
