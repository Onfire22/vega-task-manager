import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';
import { setMessages } from '@/pages/chat/slice.ts';

const messagesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMessages: builder.query({
			query: (channelUuid) => ({
				url: ROUTES.messages,
				method: METHODS.get,
				params: { channelUuid },
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled;
				dispatch(setMessages(data.messages));
			},
		}),
	}),
});

export const { useGetMessagesQuery } = messagesApi;
