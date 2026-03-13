import { useProject } from '../../api/hooks.ts';

export const useProjectData = (uuid?: string) => {
	const { project, isProjectLoading } = useProject(uuid);

	console.log(project);

	return {
		project,
		isProjectLoading,
	};
};
