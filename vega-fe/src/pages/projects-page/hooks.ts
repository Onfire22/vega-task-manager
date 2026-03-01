import { useDictionaries, useProjects, useUsers } from '../../api/hooks.ts';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';

export const useProjectsTableData = () => {
	const { dictionaries, isDictionariesLoading } = useDictionaries(['ROLE_TYPE']);
	const { usersList, isUsersLoading } = useUsers();
	const { projectsList, isProjectsLoading } = useProjects();

	const isProjectDataLoading = isDictionariesLoading || isUsersLoading || isProjectsLoading;

	if (isProjectDataLoading) {
		return {
			projects: [],
			isLoading: true,
		};
	}

	const ownerDictionaryUuid = dictionaries?.role_type?.find((role) => role.name === 'owner')?.id;

	const projects = projectsList.map((project) => {
		const ownerUuid = project.memberships.find((member) => member.userRoleUuid === ownerDictionaryUuid)?.userUuid;
		const owner = usersList.find((user) => user.id === ownerUuid);

		return {
			id: project.id,
			code: project.code,
			description: project.description,
			title: project.title,
			createdAt: format(project.createdAt, DATE_FORMAT),
			owner: owner ? `${owner.name} ${owner.secondName}` : '-',
		};
	});

	return { projects, isLoading: false };
};
