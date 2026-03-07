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

const Task = () => {
	const params = useParams();
	const dispatch = useAppDispatch();

	const [field, setEditField] = useState(INITIAL_FIELD_VALUES);

	const { dictionaries } = useDictionaries(BASE_DICTIONARIES_META);
	const { dictionariesOptions } = useDictionariesOptions(BASE_DICTIONARIES_META);
	const { isTasksLoading, task, activeTaskStatus } = useTaskData(params.uuid);
	const { usersListOptions } = useUsersOptions();
	const [updateTask] = useUpdateTaskMutation();

	const handleEditField = (fieldName: string, value: string | null) => {
		let data = value;

		if (SELECT_FIELDS.includes(fieldName)) {
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

	const handleUpdateTask = async () => {
		try {
			const data = {
				[field.fieldName]: field.value,
			};
			console.log(data);
			const response = await updateTask({ ...data, uuid: params.uuid }).unwrap();
			setEditField(INITIAL_FIELD_VALUES);
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	};

	if (isTasksLoading) return <Loader />;

	return (
		<TaskView
			task={task}
			field={field}
			activeTaskStatus={activeTaskStatus}
			taskStatuses={dictionaries?.task_status}
			usersListOptions={usersListOptions}
			onEditField={handleEditField}
			onFieldChange={handleFieldChange}
			onCancelChanges={handleCancelChanges}
			onLogWorkModalShown={handleLogWorkModalShown}
			onUpdateTask={handleUpdateTask}
			options={{ type: dictionariesOptions.stack_type, priority: dictionariesOptions.task_priority }}
		/>
	);
};

export { Task };
