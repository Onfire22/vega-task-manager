import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { ICommentCreateBody, IEditCommentPayload, TBaseResponse, TCommentsResponse } from '../types.ts';
import { BaseResponseSchema, CommentsResponseSchema } from '@/api/validation.ts';

const commentsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTaskComments: builder.query<TCommentsResponse, string>({
			query: (taskUuid) => ({
				method: METHODS.get,
				url: `${ROUTES.getTasks}/${taskUuid}/comments`,
			}),
			providesTags: ['Comments'],
			extraOptions: { schema: CommentsResponseSchema },
		}),
		createComment: builder.mutation<TBaseResponse, ICommentCreateBody>({
			query: (data) => ({
				method: METHODS.post,
				url: `${ROUTES.comments}/${data.taskUuid}`,
				body: data,
			}),
			invalidatesTags: ['Comments'],
			extraOptions: { schema: BaseResponseSchema },
		}),
		editComment: builder.mutation<TBaseResponse, IEditCommentPayload>({
			query: ({ commentUuid, text }) => ({
				method: METHODS.patch,
				url: `${ROUTES.comments}/${commentUuid}`,
				body: { text },
			}),
			invalidatesTags: ['Comments'],
			extraOptions: { schema: BaseResponseSchema },
		}),
		deleteComment: builder.mutation<TBaseResponse, string>({
			query: (taskUuid) => ({
				method: METHODS.delete,
				url: `${ROUTES.comments}/${taskUuid}`,
			}),
			invalidatesTags: ['Comments'],
			extraOptions: { schema: BaseResponseSchema },
		}),
	}),
});

export const { useCreateCommentMutation, useGetTaskCommentsQuery, useDeleteCommentMutation, useEditCommentMutation } =
	commentsApi;
