import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';

const teamsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTeams: builder.mutation({
			query: (data) => ({
				url: ROUTES.teams,
				method: METHODS.post,
				body: data,
			}),
		}),
	}),
});

export const { useCreateTeamsMutation } = teamsApi;
