import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import {
	createCommentController,
	deleteCommentController,
	getTaskCommentsController,
	updateCommentController,
} from './comments.controller';
import { validateMiddleware } from '../../common/middlewares';
import {
	CreateCommentBodySchema,
	DeleteCommentParamsSchema,
	TaskCommentsParamsSchema,
	UpdateCommentBodySchema,
	UpdateCommentParamsSchema,
} from './comments.validation';

const commentsRouter = Router();

commentsRouter.get(ROUTES.comments, validateMiddleware(TaskCommentsParamsSchema, 'params'), getTaskCommentsController);
commentsRouter.post(ROUTES.comment, validateMiddleware(CreateCommentBodySchema), createCommentController);
commentsRouter.patch(
	ROUTES.comment,
	[validateMiddleware(UpdateCommentParamsSchema, 'params'), validateMiddleware(UpdateCommentBodySchema)],
	updateCommentController,
);
commentsRouter.delete(ROUTES.comment, validateMiddleware(DeleteCommentParamsSchema, 'params'), deleteCommentController);

export { commentsRouter };
