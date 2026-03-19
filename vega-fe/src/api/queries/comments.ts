import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { ICommentCreateBody, ICommentsResponse, IEditCommentPayload } from '../types.ts';

const commentsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTaskComments: builder.query<ICommentsResponse, string>({
			query: (taskUuid) => ({
				method: METHODS.get,
				url: `${ROUTES.getTasks}/${taskUuid}/comments`,
			}),
			providesTags: ['Comments'],
		}),
		createComment: builder.mutation<{ success: boolean }, ICommentCreateBody>({
			query: (data) => ({
				method: METHODS.post,
				url: `${ROUTES.comments}/${data.taskUuid}`,
				body: data,
			}),
			invalidatesTags: ['Comments'],
		}),
		editComment: builder.mutation<{ success: boolean }, IEditCommentPayload>({
			query: ({ commentUuid, text }) => ({
				method: METHODS.patch,
				url: `${ROUTES.comments}/${commentUuid}`,
				body: { text },
			}),
			invalidatesTags: ['Comments'],
		}),
		deleteComment: builder.mutation<{ success: boolean }, string>({
			query: (taskUuid) => ({
				method: METHODS.delete,
				url: `${ROUTES.comments}/${taskUuid}`,
			}),
			invalidatesTags: ['Comments'],
		}),
	}),
});

export const { useCreateCommentMutation, useGetTaskCommentsQuery, useDeleteCommentMutation, useEditCommentMutation } =
	commentsApi;
