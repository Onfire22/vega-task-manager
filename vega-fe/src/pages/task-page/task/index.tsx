import { TaskView } from './task-view';
import { Loader } from '@mantine/core';
import { useDictionaries, useDictionariesOptions, useUsersOptions } from '../../../api/hooks.ts';
import { INITIAL_FIELD_VALUES, SELECT_FIELDS, USER_FIELD } from '../constants.ts';
import { useParams } from 'react-router-dom';
import { useTaskData } from '../hooks.ts';
import { useUpdateTaskMutation } from '../../../api/queries/tasks.api.ts';
import { BASE_DICTIONARIES_META } from '../../tasks-page/constants.ts';
import React, { useState } from 'react';
import type { DictionaryKey } from '../types.ts';
import { useAppDispatch } from '../../../store/hooks.ts';
import { setIsModalShown } from '../slice.ts';
import { useGetCurrentUserQuery } from '../../../api/queries/auth.api.ts';

const Task = () => {
	const params = useParams();
	const dispatch = useAppDispatch();

	const [field, setEditField] = useState(INITIAL_FIELD_VALUES);
	const [activeTab, setActiveTab] = useState('comments');

	const handleSetActiveTab = (value: string | null) => {
		if (value) {
			setActiveTab(value);
		}
	};

	const { dictionaries } = useDictionaries(BASE_DICTIONARIES_META);
	const { dictionariesOptions } = useDictionariesOptions(BASE_DICTIONARIES_META);
	const { isTaskLoading, task, activeTaskStatus } = useTaskData(params.uuid);
	const { usersListOptions } = useUsersOptions();
	const { data } = useGetCurrentUserQuery();
	const [updateTask] = useUpdateTaskMutation();

	const handleEditField = (fieldName: string, value: string | null) => {
		let data = value;

		if (SELECT_FIELDS.includes(fieldName) || fieldName === USER_FIELD) {
			const options =
				fieldName === USER_FIELD ? usersListOptions : dictionariesOptions[fieldName as DictionaryKey];

			data = options?.find((item) => item.label === value || item.value === value)?.value ?? value;
		}

		if (data) {
			setEditField({ fieldName, value: data });
		}
	};

	const handleFieldChange: {
		(fieldName: string, e: React.ChangeEvent<HTMLInputElement>): void;
		(fieldName: string, e: React.ChangeEvent<HTMLTextAreaElement>): void;
	} = (fieldName, e) => {
		setEditField({ fieldName, value: e.target.value });
	};

	const handleCancelChanges = () => {
		setEditField(INITIAL_FIELD_VALUES);
	};

	const handleLogWorkModalShown = () => {
		dispatch(setIsModalShown(true));
	};

	const handleUpdateTask = async (customField?: { fieldName: string; value: string }) => {
		try {
			const fieldData = customField ?? field;

			const response = await updateTask({ ...fieldData, uuid: params.uuid }).unwrap();
			setEditField(INITIAL_FIELD_VALUES);
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	};

	return isTaskLoading ? (
		<Loader />
	) : (
		<TaskView
			task={task}
			field={field}
			activeTaskStatus={activeTaskStatus}
			taskStatuses={dictionaries?.taskStatus}
			usersListOptions={usersListOptions}
			currentUserId={data?.currentUser.id}
			activeTab={activeTab}
			onEditField={handleEditField}
			onFieldChange={handleFieldChange}
			onCancelChanges={handleCancelChanges}
			onLogWorkModalShown={handleLogWorkModalShown}
			onUpdateTask={handleUpdateTask}
			onSetActiveTab={handleSetActiveTab}
			options={{ type: dictionariesOptions.stackType, priority: dictionariesOptions.taskPriority }}
		/>
	);
};

export { Task };
