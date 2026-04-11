import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';
import { setChannels } from '@/pages/chat/slice.ts';
import { ChannelsResponseSchema } from '@/api/channels/channels.validation.ts';
import type { ChannelsResponse } from '@/api/channels/channels.types.ts';

const channelsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getChannels: builder.query<ChannelsResponse, void>({
			query: () => ({
				url: ROUTES.channels,
				method: METHODS.get,
			}),
			extraOptions: { schema: ChannelsResponseSchema },
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled;
				dispatch(setChannels(data.channels));
			},
		}),
	}),
});

export const { useGetChannelsQuery } = channelsApi;
