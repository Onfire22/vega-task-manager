import { TaskView } from './task-view';
import { Loader } from '@mantine/core';
import { useDictionaries, useDictionariesOptions } from '../../../api/hooks.ts';
import { SELECT_FIELDS, TASK_STATUS_NUMBER } from '../constants.ts';
import { useParams } from 'react-router-dom';
import { useTask } from '../hooks.ts';
import { useUpdateTaskStatusMutation } from '../../../api/queries/tasks.api.ts';
import { BASE_DICTIONARIES_META } from '../../tasks-page/constants.ts';
import React, { useState } from 'react';
import type { DictionaryKey } from '../types.ts';

const Task = () => {
	const params = useParams();
	const [field, setEditField] = useState({
		fieldName: '',
		value: '',
	});

	const { dictionaries } = useDictionaries(BASE_DICTIONARIES_META);
	const { dictionariesOptions } = useDictionariesOptions(BASE_DICTIONARIES_META);
	const { isTasksLoading, task } = useTask(params?.uuid);
	const [updateTaskStatus] = useUpdateTaskStatusMutation();

	if (!task) return null;

	const activeTaskStatus = TASK_STATUS_NUMBER[task.taskStatusUuid as keyof typeof TASK_STATUS_NUMBER];

	const handleTaskStatusUpdate = (uuid: string, status: string) => {
		updateTaskStatus({ uuid, status });
	};

	const handleSetEditField = (fieldName: string, value: string) => {
		let data = value;

		if (SELECT_FIELDS.includes(fieldName)) {
			data =
				dictionariesOptions?.[fieldName as DictionaryKey]?.find(
					(item) => item.label === value || item.value === value,
				)?.value ?? value;
		}

		setEditField({ fieldName, value: data });
	};

	const handleFieldChange: {
		(fieldName: string, e: React.ChangeEvent<HTMLInputElement>): void;
		(fieldName: string, e: React.ChangeEvent<HTMLTextAreaElement>): void;
	} = (fieldName, e) => {
		setEditField({ fieldName, value: e.target.value });
	};

	const handleCancelChanges = () => {
		setEditField({ fieldName: '', value: '' });
	};

	return isTasksLoading ? (
		<Loader />
	) : (
		<TaskView
			task={task}
			activeTaskStatus={activeTaskStatus}
			taskStatuses={dictionaries?.task_status}
			field={field}
			onTaskStatusUpdate={handleTaskStatusUpdate}
			onSetEditField={handleSetEditField}
			onFieldChange={handleFieldChange}
			onCancelChanges={handleCancelChanges}
			options={{ type: dictionariesOptions.stack_type, priority: dictionariesOptions.task_priority }}
		/>
	);
};

export { Task };
