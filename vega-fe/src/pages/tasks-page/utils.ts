import type { IDictionary, ITask } from './types.ts';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';
import type { TPayload } from '../../api/types.ts';

export const transformDictionaries = (dictionary: Array<IDictionary>) => {
	return dictionary.map((item) => {
		return { label: item.name, value: item.id };
	});
};

export const transformTasksDataToTable = (tasks: Array<ITask>, dictionaries: TPayload) => {
	if (!tasks.length || !dictionaries) return [];

	return tasks.map((task) => {
		const taskStack = dictionaries.stack_type.find((item) => item.id === task.taskStackUuid);
		const taskStatus = dictionaries.task_status.find((item) => item.id === task.taskStatusUuid);

		return {
			...task,
			createdAt: format(new Date(task.createdAt), DATE_FORMAT),
			taskPriorityUuid: dictionaries.task_priority.find((item) => item.id === task.taskPriorityUuid)?.name ?? '-',
			taskStackUuid: {
				name: taskStack?.name ?? '-',
				color: taskStack?.color ?? '#fff',
			},
			taskStatusUuid: {
				name: taskStatus?.name ?? '-',
				color: taskStatus?.color ?? '#fff',
			},
			reporterUuid: '-',
		};
	});
};
