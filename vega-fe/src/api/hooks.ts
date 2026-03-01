import { useGetDictionariesQuery } from './queries/dictionaries.api.ts';
import { transformDictionaries } from '../pages/tasks-page/utils.ts';
import { CACHING_SETTINGS } from '../constants.ts';
import type { TDictionariesTypes } from './types.ts';
import { useGetUsersQuery } from './queries/users.api.ts';
import { useGetProjectsQuery } from './queries/projects.api.ts';

export const useDictionaries = (meta: TDictionariesTypes[]) => {
	const { data, isLoading, isSuccess } = useGetDictionariesQuery(meta, CACHING_SETTINGS);

	const dictionaries = isSuccess ? data.dictionaries : {};

	return { dictionaries, isDictionariesLoading: isLoading };
};

export const useDictionariesOptions = (meta: TDictionariesTypes[]) => {
	const { dictionaries, isDictionariesLoading } = useDictionaries(meta);

	const dictionariesOptions = (Object.keys(dictionaries) as Array<keyof typeof dictionaries>).reduce(
		(acc, key) => {
			if (dictionaries[key]) {
				return {
					...acc,
					[key]: transformDictionaries(dictionaries[key]),
				};
			}

			return acc;
		},
		{} as Record<keyof typeof dictionaries, ReturnType<typeof transformDictionaries>>,
	);

	return { dictionariesOptions, isDictionariesLoading };
};

export const useUsers = () => {
	const { data, isLoading, isSuccess } = useGetUsersQuery();

	const usersList = isSuccess ? data.usersList : [];

	return { usersList, isUsersLoading: isLoading };
};

export const useUsersOptions = () => {
	const { usersList, isUsersLoading } = useUsers();

	const usersListOptions = usersList.map((user) => ({
		label: `${user.name} ${user.secondName}`,
		value: user.id,
	}));

	return { usersListOptions, isUsersLoading };
};

export const useProjects = () => {
	const { data, isLoading, isSuccess } = useGetProjectsQuery();

	const projectsList = isSuccess ? data.projects : [];

	return { projectsList, isProjectsLoading: isLoading };
};

export const useProjectsOptions = () => {
	const { projectsList, isProjectsLoading } = useProjects();

	const projectOptions = projectsList.map((project) => ({
		label: project.title,
		value: project.id,
	}));

	return { projectOptions, isProjectsLoading };
};
