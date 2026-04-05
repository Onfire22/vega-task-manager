import { NextFunction, Request, Response } from 'express';
import { RESPONSE_STATUSES } from '../../common/constants';
import { TCreateCommentBody, TUpdateCommentBody, TUuidParams } from './comments.types';
import { commentsService } from './comments.service';

export const getTaskComments = async (req: Request<TUuidParams>, res: Response, next: NextFunction) => {
	try {
		const comments = await commentsService.getComments(req.params.uuid);

		res.status(RESPONSE_STATUSES.success).json({ comments });
	} catch (e) {
		next(e);
	}
};

export const createComment = async (req: Request<{}, {}, TCreateCommentBody>, res: Response, next: NextFunction) => {
	try {
		await commentsService.createComment(res.locals.user.id, req.body);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(e);
	}
};

export const updateComment = async (
	req: Request<TUuidParams, {}, TUpdateCommentBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		await commentsService.updateComment(req.params.uuid, req.body.text);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(e);
	}
};

export const deleteComment = async (req: Request<TUuidParams, {}, {}>, res: Response, next: NextFunction) => {
	try {
		await commentsService.deleteComment(req.params.uuid);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(e);
	}
};
