import { TaskPersonnelView } from '@/pages/task-page/components/task-personnel/task-personnel.view.tsx';
import { useTaskData, useUpdateTask, useUsersWithFilters } from '@/pages/task-page/hooks.ts';
import React, { useState } from 'react';
import { useGetCurrentUserQuery } from '@/api/auth/auth.api.ts';

const TaskPersonnel = () => {
	const [searchValue, setSearchValue] = useState('');

	const { task } = useTaskData();
	const { usersListOptions, isUsersLoading } = useUsersWithFilters(task, searchValue);
	const { data } = useGetCurrentUserQuery();
	const updateTask = useUpdateTask();

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<TaskPersonnelView
			task={task}
			searchValue={searchValue}
			isUsersLoading={isUsersLoading}
			usersListOptions={usersListOptions}
			currentUserId={data?.currentUser.id}
			onUpdateTask={updateTask}
			onSearchChange={handleSearchChange}
		/>
	);
};

export { TaskPersonnel };
