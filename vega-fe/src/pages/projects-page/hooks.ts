import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { getProjectsMetaSelector } from '@/pages/projects-page/selectors.ts';
import { getPaginationPages } from '@/app/utils.ts';
import { useDictionaries } from '@/api/dictionaries/dictionaries.hooks.ts';
import { useProjects } from '@/api/projects/projects.hooks.ts';

export const useProjectsTableData = () => {
	const meta = useAppSelector(getProjectsMetaSelector());

	const { dictionaries, isDictionariesLoading } = useDictionaries(['ROLE_TYPE']);
	const { projectsList, meta: paginationData, isProjectsLoading } = useProjects(meta);

	const isProjectDataLoading = isDictionariesLoading || isProjectsLoading;

	if (isProjectDataLoading || !projectsList || !paginationData) {
		return {
			projects: [],
			pagination: { pages: [], activePage: 1, totalPages: 0, hasNext: false, hasPrev: false },
			isLoading: isProjectDataLoading,
		};
	}

	const paginationPages = getPaginationPages(paginationData.page, paginationData.totalPages);

	const ownerDictionaryUuid = dictionaries?.roleType?.find((role) => role.key === 'owner')?.uuid;

	const projects = projectsList.map((project) => {
		const owner = project.users.find((user) => user.role.uuid === ownerDictionaryUuid);

		return {
			...project,
			createdAt: format(project.createdAt, DATE_FORMAT),
			owner: owner ? `${owner.name} ${owner.secondName}` : '-',
		};
	});

	const pagination = {
		pages: paginationPages,
		activePage: paginationData.page,
		totalPages: paginationData.totalPages,
		hasNext: paginationData.hasNext,
		hasPrev: paginationData.hasPrev,
	};

	return { projects, pagination, isLoading: false };
};
