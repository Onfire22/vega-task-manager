import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { IProject } from '../types.ts';

const projectsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query<{ projects: IProject[] }, void>({
			query: () => ({
				url: ROUTES.projects,
				method: METHODS.get,
			}),
		}),
	}),
});

export const { useGetProjectsQuery } = projectsApi;
