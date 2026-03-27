import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { ICommentCreateBody, ICommentUpdateBody } from './comments.types';
import { prismaAppClient } from '../../lib/prisma';

export const getTaskComments = async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
	try {
		const comments = await prismaAppClient.comment.findMany({
			where: { taskUuid: req.params.uuid },
			select: {
				id: true,
				text: true,
				createdAt: true,
				updatedAt: true,
				author: {
					select: {
						id: true,
						name: true,
						secondName: true,
					},
				},
			},
		});

		res.status(RESPONSE_STATUSES.success).json({ comments });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const createComment = async (req: Request<{}, {}, ICommentCreateBody>, res: Response, next: NextFunction) => {
	try {
		const currentUserUuid = res.locals.user.id;

		await prismaAppClient.comment.create({
			data: {
				...req.body,
				authorUuid: currentUserUuid,
			},
		});

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const updateComment = async (
	req: Request<{ uuid: string }, {}, ICommentUpdateBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		await prismaAppClient.comment.update({
			where: { id: req.params.uuid },
			data: { text: req.body.text },
		});

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const deleteComment = async (req: Request<{ uuid: string }, {}, {}>, res: Response, next: NextFunction) => {
	try {
		await prismaAppClient.comment.delete({ where: { id: req.params.uuid } });

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
