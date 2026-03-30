import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type {
	IProjectCreate,
	IProjectUpdateRequest,
	IUpdateUserRole,
	TBaseResponse,
	TCreateProjectResponse,
	TProjectResponse,
	TProjectsResponse,
} from '../types.ts';
import {
	BaseResponseSchema,
	CreateProjectResponseSchema,
	ProjectResponseSchema,
	ProjectsResponseSchema,
} from '@/api/validation.ts';

const projectsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query<TProjectsResponse, void>({
			query: () => ({
				url: ROUTES.projects,
				method: METHODS.get,
			}),
			providesTags: ['Projects'],
			extraOptions: { schema: ProjectsResponseSchema },
		}),
		createProject: builder.mutation<TCreateProjectResponse, IProjectCreate>({
			query: (projectData) => ({
				url: ROUTES.createProject,
				method: METHODS.post,
				body: projectData,
			}),
			invalidatesTags: ['Projects'],
			extraOptions: { schema: CreateProjectResponseSchema },
		}),
		getProjectByUuid: builder.query<TProjectResponse, string>({
			query: (uuid) => ({
				url: `${ROUTES.project}/${uuid}`,
				method: METHODS.get,
			}),
			providesTags: ['Project'],
			extraOptions: { schema: ProjectResponseSchema },
		}),
		updateProject: builder.mutation<TBaseResponse, IProjectUpdateRequest>({
			query: ({ uuid, ...data }) => ({
				url: `${ROUTES.project}/${uuid}`,
				method: METHODS.post,
				body: data,
			}),
			invalidatesTags: ['Project'],
			extraOptions: { schema: BaseResponseSchema },
		}),
		updateUserRole: builder.mutation<TBaseResponse, IUpdateUserRole>({
			query: ({ uuid, ...userData }) => ({
				url: `${ROUTES.project}/${uuid}/members`,
				method: METHODS.post,
				body: userData,
			}),
			invalidatesTags: ['Project', 'Users'],
			extraOptions: { schema: BaseResponseSchema },
		}),
	}),
});

export const {
	useGetProjectsQuery,
	useCreateProjectMutation,
	useGetProjectByUuidQuery,
	useUpdateProjectMutation,
	useUpdateUserRoleMutation,
} = projectsApi;
