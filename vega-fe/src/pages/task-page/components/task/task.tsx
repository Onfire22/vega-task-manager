import { TaskView } from './task.view.tsx';
import { INITIAL_FIELD_VALUES } from '../../constants.ts';
import { useParams } from 'react-router-dom';
import { useDictionariesWithColors, useTaskData, useChartData, useUsersWithFilters } from '../../hooks.ts';
import { useUpdateTaskMutation } from '@/api/tasks/tasks.api.ts';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks.ts';
import { setModalType } from '../../slice.ts';
import { useGetCurrentUserQuery } from '@/api/auth/auth.api.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { toast } from 'sonner';
import type { TField, TModalType, TTaskFields } from '@/pages/task-page/types.ts';
import { Comments } from '@/pages/task-page/components/comments/comments.tsx';
import { TaskLogs } from '@/pages/task-page/components/task-logs/task-logs.tsx';

const activityComponents = {
	comments: Comments,
	logs: TaskLogs,
};

const Task = () => {
	const params = useParams();
	const dispatch = useAppDispatch();

	const [field, setEditField] = useState<TField>(INITIAL_FIELD_VALUES);
	const [activeTab, setActiveTab] = useState('comments');
	const [searchValue, setSearchValue] = useState('');

	const { dictionariesOptions } = useDictionariesWithColors();
	const { isTaskLoading, task } = useTaskData();
	const { usersListOptions, isUsersLoading } = useUsersWithFilters(task, searchValue);
	const { data } = useGetCurrentUserQuery();
	const [updateTask] = useUpdateTaskMutation();
	const { chartData } = useChartData();

	const handleSetActiveTab = (value: string) => {
		if (value) {
			setActiveTab(value);
		}
	};

	const handleUpdateTask = async (fieldName: TTaskFields | '', value: string) => {
		if (!params.uuid || !fieldName) return;

		try {
			await updateTask({ fields: { [fieldName]: value }, uuid: params.uuid }).unwrap();
			setEditField(INITIAL_FIELD_VALUES);
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	};

	const handleSetFieldToEdit = (fieldName: TTaskFields | '', value: string | null) => {
		const selection = window.getSelection();
		if (selection && selection.toString().length > 0) return;

		if (value) {
			setEditField({ fieldName, value });
		}
	};

	const handleFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName: TTaskFields): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName: TTaskFields): void;
	} = (e, fieldName) => {
		setEditField({ fieldName, value: e.target.value });
	};

	const handleCancelChanges = () => {
		setEditField(INITIAL_FIELD_VALUES);
	};

	const handleModalShown = (modalType: TModalType) => {
		dispatch(setModalType(modalType));
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const component = activityComponents[activeTab as keyof typeof activityComponents];

	return isTaskLoading ? (
		<CustomLoader />
	) : (
		<TaskView
			task={task}
			field={field}
			activeTab={activeTab}
			usersListOptions={usersListOptions}
			options={dictionariesOptions ?? { taskType: [], taskPriority: [], taskStatus: [] }}
			currentUserId={data?.currentUser.id}
			component={component}
			chartData={chartData}
			searchValue={searchValue}
			isUsersLoading={isUsersLoading}
			onSetFieldToEdit={handleSetFieldToEdit}
			onFieldChange={handleFieldChange}
			onCancelChanges={handleCancelChanges}
			onModalShown={handleModalShown}
			onUpdateTask={handleUpdateTask}
			onSetActiveTab={handleSetActiveTab}
			onSearchChange={handleSearchChange}
		/>
	);
};

export { Task };
