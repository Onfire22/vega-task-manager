import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';

const filesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadFile: builder.mutation({
			query: (formData) => ({
				url: ROUTES.uploadFile,
				method: METHODS.post,
				body: formData,
			}),
		}),
	}),
});

export const { useUploadFileMutation } = filesApi;
