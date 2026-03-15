import { useDictionaries, useProjects } from '../../api/hooks.ts';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';

export const useProjectsTableData = () => {
	const { dictionaries, isDictionariesLoading } = useDictionaries(['ROLE_TYPE']);
	const { projectsList, isProjectsLoading } = useProjects();

	const isProjectDataLoading = isDictionariesLoading || isProjectsLoading;

	if (isProjectDataLoading) {
		return {
			projects: [],
			isLoading: true,
		};
	}

	const ownerDictionaryUuid = dictionaries?.roleType?.find((role) => role.key === 'owner')?.id;

	const projects = projectsList.map((project) => {
		const owner = project.users.find((user) => user.role.id === ownerDictionaryUuid);

		return {
			...project,
			createdAt: format(project.createdAt, DATE_FORMAT),
			owner: owner ? `${owner.name} ${owner.secondName}` : '-',
		};
	});

	return { projects, isLoading: false };
};
