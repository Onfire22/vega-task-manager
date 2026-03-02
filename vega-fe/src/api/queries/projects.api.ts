import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { IProject, IProjectCreate } from '../types.ts';

const projectsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query<{ projects: IProject[] }, void>({
			query: () => ({
				url: ROUTES.projects,
				method: METHODS.get,
			}),
			providesTags: ['Projects'],
		}),
		createProject: builder.mutation<{ newProject: IProject }, IProjectCreate>({
			query: (projectData) => ({
				url: ROUTES.createProject,
				method: METHODS.post,
				body: projectData,
			}),
			invalidatesTags: ['Projects'],
		}),
	}),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectsApi;
