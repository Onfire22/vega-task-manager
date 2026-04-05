import { useGetTaskQuery } from '@/api/tasks/tasks.api.ts';

export const useTask = (uuid?: string) => {
	const { data, isLoading, isSuccess } = useGetTaskQuery(uuid!, { skip: !uuid });

	const task = isSuccess ? data.task : null;

	return { task, isTaskLoading: isLoading };
};
