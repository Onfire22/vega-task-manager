import { format } from 'date-fns';
import { useDictionariesOptions, useTask } from '../../api/hooks.ts';
import { BASE_DICTIONARIES_META, COLORS, DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from './constants.ts';
import { useGetTaskCommentsQuery } from '../../api/queries/comments.ts';
import { getAvatarColor, typedEntries } from '@/app/utils.ts';
import type { TDictionariesWithColors } from '@/pages/task-page/types.ts';

export const useTaskData = (uuid?: string) => {
	const { task, isTaskLoading } = useTask(uuid);

	if (!task) return { task: null, isTaskLoading };

	const {
		logInfo: { remainingTime, estimateTime, totalLoggedTime },
	} = task;

	const taskData = {
		...task,
		reporter: `${task.reporter?.name} ${task.reporter.secondName}`,
		assignee: task.assignee ? `${task.assignee.name} ${task.assignee.secondName}` : null,
		assigneeUuid: task.assignee ? task.assignee.id : undefined,
		remainingTime: remainingTime
			? `${remainingTime.time.hours || ''} ${remainingTime.time.minutes || ''}`.trim()
			: '',
		estimateTime: estimateTime ? `${estimateTime.time.hours || ''} ${estimateTime.time.minutes || ''}`.trim() : '',
		totalLoggedTime: totalLoggedTime
			? `${totalLoggedTime.time.hours || ''} ${totalLoggedTime.time.minutes || ''}`.trim()
			: '',
		estimateTimePercents: estimateTime ? estimateTime.timeInPercents : null,
		remainingTimePercents: remainingTime ? remainingTime.timeInPercents : null,
		totalLoggedTimePercents: totalLoggedTime ? totalLoggedTime.timeInPercents : null,
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
				avatar: {
					color: getAvatarColor(item.author.id),
					initials: item.author.name.substring(0, 2),
				},
				name: `${item.author.name} ${item.author.name}`,
				userUuid: item.author.id,
			},
			commentDate: `${format(item.createdAt, DATE_FORMAT)} в ${format(item.createdAt, TIME_FORMAT)}`,
			...(item.updatedAt
				? {
						commentEditedTime: `Изменено ${format(item.updatedAt, DATE_FORMAT)} в ${format(item.updatedAt, TIME_FORMAT)}`,
					}
				: {}),
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
