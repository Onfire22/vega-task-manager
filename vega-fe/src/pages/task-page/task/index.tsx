import { TaskView } from './task-view';
import { useUsersOptions } from '../../../api/hooks.ts';
import { INITIAL_FIELD_VALUES } from '../constants.ts';
import { useParams } from 'react-router-dom';
import { useDictionariesWithColors, useTaskData } from '../hooks.ts';
import { useUpdateTaskMutation } from '../../../api/queries/tasks.api.ts';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks.ts';
import { setIsModalShown } from '../slice.ts';
import { useGetCurrentUserQuery } from '../../../api/queries/auth.api.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';

const Task = () => {
	const params = useParams();
	const dispatch = useAppDispatch();

	const [field, setEditField] = useState(INITIAL_FIELD_VALUES);
	const [activeTab, setActiveTab] = useState('comments');

	const { dictionariesOptions } = useDictionariesWithColors();
	const { isTaskLoading, task } = useTaskData(params.uuid);
	const { usersListOptions } = useUsersOptions(
		{
			filters: { withProject: task?.project.id, withoutUser: task?.assigneeUuid },
		},
		Boolean(!task),
	);
	const { data } = useGetCurrentUserQuery();
	const [updateTask] = useUpdateTaskMutation();

	const handleSetActiveTab = (value: string) => {
		if (value) {
			setActiveTab(value);
		}
	};

	const handleUpdateTask = async (fieldName: string, value: string) => {
		try {
			const response = await updateTask({ fieldName, value, uuid: params.uuid }).unwrap();
			setEditField(INITIAL_FIELD_VALUES);
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	};

	const handleSetFieldToEdit = (fieldName: string, value: string | null) => {
		const selection = window.getSelection();
		if (selection && selection.toString().length > 0) return;

		if (value) {
			setEditField({ fieldName, value });
		}
	};

	const handleFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName: string): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName: string): void;
	} = (e, fieldName) => {
		setEditField({ fieldName, value: e.target.value });
	};

	const handleCancelChanges = () => {
		setEditField(INITIAL_FIELD_VALUES);
	};

	const handleLogWorkModalShown = () => {
		dispatch(setIsModalShown(true));
	};

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
			onSetFieldToEdit={handleSetFieldToEdit}
			onFieldChange={handleFieldChange}
			onCancelChanges={handleCancelChanges}
			onLogWorkModalShown={handleLogWorkModalShown}
			onUpdateTask={handleUpdateTask}
			onSetActiveTab={handleSetActiveTab}
		/>
	);
};

export { Task };
