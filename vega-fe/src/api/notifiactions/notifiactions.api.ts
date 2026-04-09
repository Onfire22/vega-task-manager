import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';
import { getNotificationsResponseSchema } from '@/api/notifiactions/notifiactions.validation.ts';
import type { INotification, TNotificationsResponse } from '@/api/notifiactions/notifiactions.types.ts';
import { transformNotifications } from '@/api/utils.ts';

export const notificationsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getNotifications: builder.query<Array<INotification>, void>({
			query: () => ({
				url: ROUTES.notifications,
				method: METHODS.get,
			}),
			transformResponse: (response: TNotificationsResponse) => transformNotifications(response.notifications),
			extraOptions: { schema: getNotificationsResponseSchema },
		}),
		setNotificationsRead: builder.mutation<Array<INotification>, void>({
			query: () => ({
				url: ROUTES.notifications,
				method: METHODS.post,
			}),
			transformResponse: (response: TNotificationsResponse) => transformNotifications(response.notifications),
			extraOptions: { schema: getNotificationsResponseSchema },
		}),
	}),
});

export const { useGetNotificationsQuery, useSetNotificationsReadMutation } = notificationsApi;
