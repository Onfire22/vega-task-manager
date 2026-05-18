import { format } from 'date-fns';
import {
	BASE_DICTIONARIES_META,
	COLORS,
	DATE_FORMAT,
	DATE_TIME_FORMAT,
	INITIAL_FIELD_VALUES,
	TIME_FORMAT,
} from './constants.ts';
import { useGetTaskCommentsQuery } from '@/api/comments/comments.api.ts';
import { getAvatarColor, typedEntries, useDebounce } from '@/app/utils.ts';
import type { ITask, TDictionariesWithColors, TTaskFields, TTPayload } from '@/pages/task-page/types.ts';
import { useGetTaskLogsQuery } from '@/api/task-logs/task-logs.api.ts';
import { transformSecondsToTime } from '@/pages/task-page/utils.ts';
import { useDictionariesOptions } from '@/api/dictionaries/dictionaries.hooks.ts';
import { useTask } from '@/api/tasks/tasks.hooks.ts';
import { useUsersOptions } from '@/api/users/users.hooks.ts';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useUpdateTaskMutation } from '@/api/tasks/tasks.api.ts';
import { setTaskField } from '@/pages/task-page/slice.ts';
import { toast } from 'sonner';
import { useAppDispatch } from '@/store/hooks.ts';

export const useTaskData = () => {
	const params = useParams();

	const { task, isTaskLoading } = useTask(params.uuid);

	if (!task) return { task: null, isTaskLoading };

	const { mrLinks, buildLinks } = task;

	const taskData = {
		...task,
		buildLinks: buildLinks ? buildLinks.split('\n') : undefined,
		mrLinks: mrLinks ? mrLinks.split('\n') : undefined,
		reporter: `${task.reporter?.name} ${task.reporter.secondName}`,
		assignee: task.assignee ? `${task.assignee.name} ${task.assignee.secondName}` : null,
		assigneeUuid: task.assignee ? task.assignee.id : undefined,
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

	const { data: { comments } = { comments: [] }, isLoading } = useGetTaskCommentsQuery(params.uuid!);

	const commentsData = useMemo(() => {
		if (!comments) return [];

		return comments.map((item) => {
			return {
				id: item.id,
				text: item.text,
				user: {
					avatar: {
						...(item.author.avatarUrl
							? { avatarUrl: item.author.avatarUrl }
							: {
									color: getAvatarColor(item.author.id),
									initials: `${item.author.name.substring(0, 1)} ${item.author.secondName.substring(0, 1)}`,
								}),
					},
					name: `${item.author.name} ${item.author.secondName}`,
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
	}, [comments]);

	return {
		comments: commentsData,
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
						avatarUrl: log.user.avatarUrl ? log.user.avatarUrl : null,
						color: log.user.avatarUrl ? '' : getAvatarColor(log.user.id),
						initials: log.user.avatarUrl
							? ''
							: `${log.user.name.substring(0, 1)} ${log.user.secondName.substring(0, 1)}`,
					},
				},
				createdAt: format(log.createdAt, DATE_TIME_FORMAT),
			};
		}) ?? [];

	return { logs, isLoading };
};

export const useChartData = () => {
	const params = useParams();

	const { logs, isLoading } = useTimeLogs(params.uuid);
	const { task, isTaskLoading } = useTaskData();

	const chartData = useMemo(() => {
		if (!logs.length || !task) return null;

		const {
			logInfo: { remainingTime, estimateTime, totalLoggedTime },
		} = task;

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

		const logData = Object.values(data).map((log, index) => {
			return {
				value: log.value,
				name: log.name,
				custom: transformSecondsToTime(log.value),
				fill: `var(--chart-${index})`,
			};
		});

		return {
			logData,
			remainingTime: remainingTime?.time,
			estimateTime: estimateTime?.time,
			totalLoggedTime: totalLoggedTime?.time,
			estimateTimePercents: estimateTime ? estimateTime.timeInPercents : null,
			remainingTimePercents: remainingTime ? remainingTime.timeInPercents : null,
			totalLoggedTimePercents: totalLoggedTime ? totalLoggedTime.timeInPercents : null,
		};
	}, [logs, task]);

	return {
		chartData,
		isLoading: isLoading || isTaskLoading,
	};
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

export const useUpdateTask = () => {
	const params = useParams();
	const dispatch = useAppDispatch();

	const [updateTask] = useUpdateTaskMutation();

	return async (fieldName: TTaskFields | '', value: string) => {
		if (!params.uuid || !fieldName) return;

		try {
			await updateTask({ fields: { [fieldName]: value }, uuid: params.uuid }).unwrap();
			dispatch(setTaskField(INITIAL_FIELD_VALUES));
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	};
};
