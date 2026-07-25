import { useGetProjectByUuidQuery, useGetProjectsQuery } from '@/api/projects/projects.api.ts';
import type { IProjectsMeta } from '@/api/projects/projects.types.ts';

export const useProjects = (meta: IProjectsMeta) => {
	const { data, isLoading, isSuccess } = useGetProjectsQuery(meta);

	const projectsList = isSuccess ? data.projects : [];

	return { projectsList, meta: data?.meta, isProjectsLoading: isLoading };
};

export const useProjectsOptions = (meta: IProjectsMeta) => {
	const { projectsList, isProjectsLoading } = useProjects(meta);

	const projectOptions = projectsList.map((project) => ({
		label: project.title,
		value: project.uuid,
	}));

	return { projectOptions, isProjectsLoading };
};

export const useProject = (uuid?: string) => {
	const { data, isLoading, isSuccess } = useGetProjectByUuidQuery(uuid!, { skip: !uuid });

	const project = isSuccess ? data.project : null;

	return { project, isProjectLoading: isLoading };
};
