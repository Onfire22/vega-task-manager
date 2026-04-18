import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';
import { ChannelsResponseSchema } from '@/api/channels/channels.validation.ts';
import type { ChannelsResponse } from '@/api/channels/channels.types.ts';

export const channelsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUserChannels: builder.query<ChannelsResponse, void>({
			query: () => ({
				url: ROUTES.userChannels,
				method: METHODS.get,
			}),
			providesTags: ['User_Channels'],
			extraOptions: { schema: ChannelsResponseSchema },
		}),
		getChannels: builder.query<ChannelsResponse, void>({
			query: () => ({
				url: ROUTES.channels,
				method: METHODS.get,
			}),
			providesTags: ['Channels'],
		}),
	}),
});

export const { useGetUserChannelsQuery, useGetChannelsQuery } = channelsApi;
