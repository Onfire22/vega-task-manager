import { TaskView } from './task-view';
import { Loader } from '@mantine/core';
import { useDictionariesOptions, useUsersOptions } from '../../../api/hooks.ts';
import { BASE_DICTIONARIES_META, INITIAL_FIELD_VALUES } from '../constants.ts';
import { useParams } from 'react-router-dom';
import { useTaskData } from '../hooks.ts';
import { useUpdateTaskMutation } from '../../../api/queries/tasks.api.ts';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks.ts';
import { setIsModalShown } from '../slice.ts';
import { useGetCurrentUserQuery } from '../../../api/queries/auth.api.ts';

const Task = () => {
	const params = useParams();
	const dispatch = useAppDispatch();

	const [field, setEditField] = useState(INITIAL_FIELD_VALUES);
	const [activeTab, setActiveTab] = useState('comments');

	const { dictionariesOptions } = useDictionariesOptions(BASE_DICTIONARIES_META);
	const { isTaskLoading, task } = useTaskData(params.uuid);
	const { usersListOptions } = useUsersOptions();
	const { data } = useGetCurrentUserQuery();
	const [updateTask] = useUpdateTaskMutation();

	const handleSetActiveTab = (value: string | null) => {
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
		<Loader />
	) : (
		<TaskView
			task={task}
			field={field}
			activeTab={activeTab}
			usersListOptions={usersListOptions}
			options={dictionariesOptions}
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
