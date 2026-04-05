import { BaseResponseSchema, CommentsResponseSchema } from './comments.validation';
import { z } from 'zod';

export interface ICommentCreateBody {
	taskUuid: string;
	text: string;
}

export interface IEditCommentPayload {
	commentUuid: string;
	text: string;
}
export type TBaseResponse = z.infer<typeof BaseResponseSchema>;

export type TCommentsResponse = z.infer<typeof CommentsResponseSchema>;
