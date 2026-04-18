import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';
import type { GetMessagesResponse } from '@/api/messages/messages.types.ts';

const messagesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMessages: builder.query<GetMessagesResponse, string>({
			query: (channelUuid) => ({
				url: `${ROUTES.messages}/${channelUuid}`,
				method: METHODS.get,
			}),
			providesTags: ['Messages'],
		}),
	}),
});

export const { useGetMessagesQuery } = messagesApi;
