import { format } from 'date-fns';
import { BASE_DICTIONARIES_META, COLORS, DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from './constants.ts';
import { useGetTaskCommentsQuery } from '@/api/comments/comments.api.ts';
import { getAvatarColor, typedEntries, useDebounce } from '@/app/utils.ts';
import type { ITask, TDictionariesWithColors, TTPayload } from '@/pages/task-page/types.ts';
import { useGetTaskLogsQuery } from '@/api/task-logs/task-logs.api.ts';
import { transformSecondsToTime } from '@/pages/task-page/utils.ts';
import { useDictionariesOptions } from '@/api/dictionaries/dictionaries.hooks.ts';
import { useTask } from '@/api/tasks/tasks.hooks.ts';
import { useUsersOptions } from '@/api/users/users.hooks.ts';
import { useParams } from 'react-router-dom';

export const useTaskData = () => {
	const params = useParams();

	const { task, isTaskLoading } = useTask(params.uuid);

	if (!task) return { task: null, isTaskLoading };

	const {
		logInfo: { remainingTime, estimateTime, totalLoggedTime },
		mrLinks,
		buildLinks,
	} = task;

	const taskData = {
		...task,
		buildLinks: buildLinks ? buildLinks.split('\n') : undefined,
		mrLinks: mrLinks ? mrLinks.split('\n') : undefined,
		reporter: `${task.reporter?.name} ${task.reporter.secondName}`,
		assignee: task.assignee ? `${task.assignee.name} ${task.assignee.secondName}` : null,
		assigneeUuid: task.assignee ? task.assignee.id : undefined,
		remainingTime: remainingTime?.time,
		estimateTime: estimateTime?.time,
		totalLoggedTime: totalLoggedTime?.time,
		estimateTimePercents: estimateTime ? estimateTime.timeInPercents : null,
		remainingTimePercents: remainingTime ? remainingTime.timeInPercents : null,
		totalLoggedTimePercents: totalLoggedTime ? totalLoggedTime.timeInPercents : null,
		updatedAt: format(new Date(task.updatedAt), DATE_FORMAT),
		createdAt: format(new Date(task.createdAt), DATE_FORMAT),
	};

	return {
		task: taskData,
		isTaskLoading,
	};
};

export const useComments = () => {
	const params = useParams();

	const { data, isLoading } = useGetTaskCommentsQuery(params.uuid!);

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

export const useTimeLogs = (uuid?: string) => {
	const { data, isLoading } = useGetTaskLogsQuery(uuid!);

	if (isLoading) return { logs: [], isLoading };

	const logs =
		data?.timeLogs.map((log) => {
			return {
				...log,
				description: log.description || 'No description',
				user: {
					id: log.user.id,
					name: `${log.user.name} ${log.user.secondName}`,
					avatar: {
						color: getAvatarColor(log.user.id),
						initials: log.user.name.substring(0, 2),
					},
				},
				createdAt: format(log.createdAt, DATE_TIME_FORMAT),
			};
		}) ?? [];

	return { logs, isLoading };
};

export const useTaskPayload = () => {
	const params = useParams();

	const { logs, isLoading } = useTimeLogs(params.uuid);

	if (!logs.length) return { chartData: null, isLoading };

	const data = logs.reduce<TTPayload>((acc, item) => {
		if (!acc[item.user.id]) {
			acc[item.user.id] = {
				value: item.loggedTimeInSecs,
				name: item.user.name,
			};
		} else {
			acc[item.user.id].value += item.loggedTimeInSecs;
		}

		return acc;
	}, {});

	const chartData = Object.values(data).map((log, index) => {
		return {
			value: log.value,
			name: log.name,
			custom: transformSecondsToTime(log.value),
			fill: `var(--chart-${index})`,
		};
	});

	return { chartData, isLoading };
};

export const useUsersWithFilters = (task: ITask | null, searchValue: string) => {
	const debouncedValue = useDebounce(searchValue, 1000);

	const meta = {
		filters: {
			...(debouncedValue ? { search: debouncedValue } : {}),
			...(task?.project ? { withProject: task.project.id } : {}),
			...(task?.assigneeUuid ? { withoutUser: task.assigneeUuid } : {}),
		},
	};

	const { usersListOptions, isUsersLoading } = useUsersOptions(meta);

	return { usersListOptions, isUsersLoading };
};
