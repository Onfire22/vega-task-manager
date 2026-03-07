import { TaskView } from './task-view';
import { Loader } from '@mantine/core';
import { useDictionaries, useDictionariesOptions, useUsersOptions } from '../../../api/hooks.ts';
import { INITIAL_FIELD_VALUES, SELECT_FIELDS, USER_FIELD } from '../constants.ts';
import { useParams } from 'react-router-dom';
import { useTaskData } from '../hooks.ts';
import { useUpdateTaskStatusMutation } from '../../../api/queries/tasks.api.ts';
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
	const [updateTaskStatus] = useUpdateTaskStatusMutation();

	const handleTaskStatusUpdate = (uuid: string, status: string) => {
		updateTaskStatus({ uuid, status });
	};

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

	return isTasksLoading ? (
		<Loader />
	) : (
		<TaskView
			task={task}
			field={field}
			activeTaskStatus={activeTaskStatus}
			taskStatuses={dictionaries?.task_status}
			usersListOptions={usersListOptions}
			onTaskStatusUpdate={handleTaskStatusUpdate}
			onEditField={handleEditField}
			onFieldChange={handleFieldChange}
			onCancelChanges={handleCancelChanges}
			onLogWorkModalShown={handleLogWorkModalShown}
			options={{ type: dictionariesOptions.stack_type, priority: dictionariesOptions.task_priority }}
		/>
	);
};

export { Task };
