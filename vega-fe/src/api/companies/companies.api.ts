import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';

const companiesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createCompany: builder.mutation({
			query: (data) => ({
				method: METHODS.post,
				body: data,
				url: `${ROUTES.company}`,
			}),
		}),
	}),
});

export const { useCreateCompanyMutation } = companiesApi;
