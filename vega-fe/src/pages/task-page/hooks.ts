import { format } from 'date-fns';
import { useDictionariesOptions, useTask } from '../../api/hooks.ts';
import { BASE_DICTIONARIES_META, COLORS, DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from './constants.ts';
import { useGetTaskCommentsQuery } from '../../api/queries/comments.ts';
import { typedEntries } from '@/app/utils.ts';
import type { TDictionariesWithColors } from '@/pages/task-page/types.ts';

export const useTaskData = (uuid?: string) => {
	const { task, isTaskLoading } = useTask(uuid);

	if (!task) return { task: null, isTaskLoading };

	const remainingPercents = task.remainingTimeInSecs ? (task.remainingTimeInSecs * 100) / task.estimateTimeInSecs : 0;

	const loggedPercents = task.totalLoggedTimeInSecs
		? (task.totalLoggedTimeInSecs * 100) / task.estimateTimeInSecs
		: 0;

	const taskData = {
		...task,
		remainingPercents,
		loggedPercents,
		reporter: `${task.reporter?.name} ${task.reporter.secondName}`,
		assignee: task.assignee ? `${task.assignee.name} ${task.assignee.secondName}` : null,
		assigneeUuid: task.assignee ? task.assignee.id : undefined,
		remainingTime:
			task?.remainingTime?.hours || task?.remainingTime?.minutes
				? `${task.remainingTime.hours || ''} ${task.remainingTime.minutes || ''}`
				: '',
		estimateTime:
			task?.estimateTime?.hours || task?.estimateTime?.minutes
				? `${task.estimateTime.hours || ''} ${task.estimateTime.minutes || ''}`
				: '',
		totalLoggedTime:
			task?.totalLoggedTime?.hours || task?.totalLoggedTime?.minutes
				? `${task.totalLoggedTime.hours || ''} ${task.totalLoggedTime.minutes || ''}`
				: '',
		timeLogs: task.timeLogs.map((log) => {
			return {
				...log,
				loggedTime: `${log.loggedTime.hours || ''} ${log.loggedTime.minutes || ''}`,
				createdAt: format(log.createdAt, DATE_TIME_FORMAT),
			};
		}),
		updatedAt: format(new Date(task.updatedAt), DATE_FORMAT),
		createdAt: format(new Date(task.createdAt), DATE_FORMAT),
	};

	return {
		task: taskData,
		isTaskLoading,
	};
};

export const useComments = (uuid: string) => {
	const { data, isLoading } = useGetTaskCommentsQuery(uuid);

	if (!data?.comments) {
		return {
			comments: [],
			isLoading,
		};
	}

	const comments = data.comments.map((item) => {
		return {
			id: item.id,
			text: item.text,
			user: {
				name: `${item.author.name} ${item.author.name}`,
				userUuid: item.author.id,
			},
			commentDate: `${format(item.createdAt, DATE_FORMAT)} в ${format(item.createdAt, TIME_FORMAT)}`,
		};
	});

	return {
		comments,
		isLoading,
	};
};

export const useDictionariesWithColors = () => {
	const { dictionariesOptions } = useDictionariesOptions(BASE_DICTIONARIES_META);

	if (!dictionariesOptions) return {};

	const options = typedEntries(dictionariesOptions).reduce((acc, [key, options]) => {
		acc[key as keyof TDictionariesWithColors] = options.map((option) => {
			return {
				...option,
				color: COLORS[option.key as keyof typeof COLORS],
			};
		});

		return acc;
	}, {} as TDictionariesWithColors);

	return { dictionariesOptions: options };
};
