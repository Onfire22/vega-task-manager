import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createComment, deleteComment, getTaskComments, updateComment } from './comments.controller';

const commentsRouter = Router();

commentsRouter.get(ROUTES.comments, getTaskComments);
commentsRouter.post(ROUTES.comment, createComment);
commentsRouter.patch(ROUTES.comment, updateComment);
commentsRouter.delete(ROUTES.comment, deleteComment);

export { commentsRouter };
