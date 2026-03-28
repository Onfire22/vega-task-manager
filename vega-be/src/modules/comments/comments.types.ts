import { z } from 'zod';
import { CreateCommentBodySchema, TaskCommentsParamsSchema, UpdateCommentBodySchema } from './comments.validation';

export type TUuidParams = z.infer<typeof TaskCommentsParamsSchema>;

export type TCreateCommentBody = z.infer<typeof CreateCommentBodySchema>;

export type TUpdateCommentBody = z.infer<typeof UpdateCommentBodySchema>;
