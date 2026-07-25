import { useGetUsersQuery } from '@/api/users/users.api.ts';
import type { IFiltersRequest } from '@/api/users/users.types.ts';

export const useUsers = (filters: IFiltersRequest, skip = false) => {
	const { data, isLoading, isSuccess } = useGetUsersQuery(filters, { skip });

	const usersList = isSuccess ? data.usersList : [];

	return { usersList, isUsersLoading: isLoading };
};

export const useUsersOptions = (filters: IFiltersRequest, skip = false) => {
	const { usersList, isUsersLoading } = useUsers(filters, skip);

	const usersListOptions = usersList.map((user) => ({
		label: `${user.name} ${user.secondName}`,
		value: user.uuid,
	}));

	return { usersListOptions, isUsersLoading };
};
