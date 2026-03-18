import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type {
	ICreateProjectResponse,
	IProject,
	IProjectCreate,
	IProjectResponse,
	IProjectUpdateRequest,
	IUpdateUserRole,
} from '../types.ts';

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
				url: `${ROUTES.project}/${uuid}`,
				method: METHODS.get,
			}),
			providesTags: ['Project'],
		}),
		updateProject: builder.mutation<{ success: boolean }, IProjectUpdateRequest>({
			query: ({ uuid, ...data }) => ({
				url: `${ROUTES.project}/${uuid}`,
				method: METHODS.post,
				body: data,
			}),
			invalidatesTags: ['Project'],
		}),
		updateUserRole: builder.mutation<{ success: true }, IUpdateUserRole>({
			query: ({ uuid, ...userData }) => ({
				url: `${ROUTES.project}/${uuid}/members`,
				method: METHODS.post,
				body: userData,
			}),
			invalidatesTags: ['Project'],
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
