import { useDictionaries } from '../../shared/hooks.ts';
import { useGetUsersQuery } from '../../api/queries/users.api.ts';
import { useGetProjectsQuery } from '../../api/queries/projects.api.ts';
import { format } from 'date-fns';

export const useProjects = () => {
	const { dictionaries, isDictionariesLoading } = useDictionaries(false, ['ROLE_TYPE']);
	const { data: usersListData, isLoading: isUsersLoading } = useGetUsersQuery();
	const { data: projectsListData, isLoading: isProjectsLoading } = useGetProjectsQuery();

	const ownerDictionaryUuid = dictionaries?.role_type.find((role) => role.name === 'owner')?.id;

	const isProjectDataLoading = isDictionariesLoading || isUsersLoading || isProjectsLoading;

	if (isProjectDataLoading) {
		return {
			projects: [],
			isLoading: true,
		};
	}

	const projects = projectsListData?.projects.map((project) => {
		const ownerUuid = project.memberships.find((member) => member.userRoleUuid === ownerDictionaryUuid)?.userUuid;
		const owner = usersListData?.usersList.find((user) => user.id === ownerUuid);

		return {
			id: project.id,
			code: project.code,
			description: project.description,
			title: project.title,
			createdAt: format(project.createdAt, 'dd.MM.yyyy'),
			owner: owner ? `${owner.name} ${owner.secondName}` : '-',
		};
	});

	return { projects, isLoading: false };
};
