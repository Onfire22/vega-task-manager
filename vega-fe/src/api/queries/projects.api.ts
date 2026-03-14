import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { ICreateProjectResponse, IProject, IProjectCreate, IProjectResponse } from '../types.ts';

const projectsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query<{ projects: IProject[] }, void>({
			query: () => ({
				url: ROUTES.projects,
				method: METHODS.get,
			}),
			providesTags: ['Projects'],
		}),
		createProject: builder.mutation<ICreateProjectResponse, IProjectCreate>({
			query: (projectData) => ({
				url: ROUTES.createProject,
				method: METHODS.post,
				body: projectData,
			}),
			invalidatesTags: ['Projects'],
		}),
		getProjectByUuid: builder.query<IProjectResponse, string>({
			query: (uuid) => ({
				url: `${ROUTES.getProject}/${uuid}`,
				method: METHODS.get,
			}),
		}),
	}),
});

export const { useGetProjectsQuery, useCreateProjectMutation, useGetProjectByUuidQuery } = projectsApi;
