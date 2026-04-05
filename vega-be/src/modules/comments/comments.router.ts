import { Router } from 'express';
import { ROUTES } from '../../common/constants';
import { createComment, deleteComment, getTaskComments, updateComment } from './comments.controller';
import { validateMiddleware } from '../../common/middlewares';
import {
	CreateCommentBodySchema,
	DeleteCommentParamsSchema,
	TaskCommentsParamsSchema,
	UpdateCommentBodySchema,
	UpdateCommentParamsSchema,
} from './comments.validation';

const commentsRouter = Router();

commentsRouter.get(ROUTES.comments, validateMiddleware(TaskCommentsParamsSchema, 'params'), getTaskComments);
commentsRouter.post(ROUTES.comment, validateMiddleware(CreateCommentBodySchema), createComment);
commentsRouter.patch(
	ROUTES.comment,
	[validateMiddleware(UpdateCommentParamsSchema, 'params'), validateMiddleware(UpdateCommentBodySchema)],
	updateComment,
);
commentsRouter.delete(ROUTES.comment, validateMiddleware(DeleteCommentParamsSchema, 'params'), deleteComment);

export { commentsRouter };
