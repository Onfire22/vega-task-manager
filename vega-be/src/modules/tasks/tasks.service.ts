import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { prismaAppClient } from '../../lib/prisma';
import { TCreateTaskBody, TUpdateTaskBody, TUserTasksBody } from './tasks.types';
import { DICTIONARY_SELECT, USER_SELECT } from '../../common/constants';
import { getTaskWithTransformedTime, transformTimeToSeconds } from './tasks.utils';

const createTask = async (taskData: TCreateTaskBody, userId: string) => {
	const { taskProjectUuid, ...task } = taskData;

	if (!taskProjectUuid) {
		throw new AppError('Задачу можно создать только в проекте', RESPONSE_STATUSES.iternalError);
	}

	const baseTaskStatusUuid = await prismaAppClient.dictionary.findUnique({
		where: { key_type: { key: 'todo', type: 'TASK_STATUS' } },
		select: { id: true },
	});

	if (!baseTaskStatusUuid) {
		throw new AppError('Статус не найден', RESPONSE_STATUSES.iternalError);
	}

	return prismaAppClient.$transaction(async (tx) => {
		const project = await tx.project.findUnique({
			where: { id: taskProjectUuid },
			select: { code: true, tasks: true },
		});

		if (!project) {
			throw new AppError('Проект не найден', RESPONSE_STATUSES.iternalError);
		}

		const tasksCount = String(project.tasks.length + 1).padStart(3, '0');

		const taskCode = `${project.code}-${tasksCount}`;

		const newTask = await tx.task.create({
			data: {
				...task,
				code: taskCode,
				reporterUuid: userId,
				taskStatusUuid: baseTaskStatusUuid.id,
				projectUuid: taskProjectUuid,
			},
		});

		if (!newTask) {
			throw new AppError('Задача не была создана', RESPONSE_STATUSES.iternalError);
		}
	});
};

const getUserTasks = async (taskData: TUserTasksBody, userId: string) => {
	const { isAssignee, sorting, filters } = taskData;

	const filtersData = Object.keys(filters).length > 0 ? filters : null;

	const where = filtersData
		? Object.fromEntries(Object.entries(filtersData).map(([key, value]) => [key, { in: value }]))
		: {};

	const tasks = await prismaAppClient.task.findMany({
		where: {
			...where,
			...(isAssignee ? { assigneeUuid: userId } : { reporterUuid: userId }),
		},
		orderBy: {
			[sorting.column]: sorting.direction,
		},
		select: {
			id: true,
			code: true,
			title: true,
			description: true,
			remainingTime: true,
			taskPriority: {
				select: DICTIONARY_SELECT,
			},
			taskStatus: {
				select: DICTIONARY_SELECT,
			},
			taskStack: {
				select: DICTIONARY_SELECT,
			},
			timeLogs: {
				select: {
					id: true,
					loggedTime: true,
					description: true,
					user: true,
					createdAt: true,
					updatedAt: true,
				},
			},
			estimateTime: true,
			createdAt: true,
		},
	});

	return tasks.map((task) => getTaskWithTransformedTime(task));
};

const getTaskByUuid = async (taskUuid: string) => {
	const task = await prismaAppClient.task.findUnique({
		select: {
			id: true,
			code: true,
			title: true,
			description: true,
			estimateTime: true,
			remainingTime: true,
			createdAt: true,
			updatedAt: true,
			taskPriority: {
				select: DICTIONARY_SELECT,
			},
			taskStatus: {
				select: DICTIONARY_SELECT,
			},
			taskStack: {
				select: DICTIONARY_SELECT,
			},
			reporter: {
				select: USER_SELECT,
			},
			assignee: {
				select: USER_SELECT,
			},
			timeLogs: {
				select: {
					id: true,
					loggedTime: true,
					description: true,
					user: { select: { name: true, secondName: true, id: true } },
					createdAt: true,
					updatedAt: true,
				},
			},
			project: {
				select: {
					id: true,
					code: true,
					title: true,
					projectStatus: {
						select: {
							key: true,
							label: true,
						},
					},
				},
			},
		},
		where: { id: taskUuid },
	});

	if (!task) {
		throw new AppError('Task not found', RESPONSE_STATUSES.notFound);
	}

	return getTaskWithTransformedTime(task);
};

const updateTask = (taskData: TUpdateTaskBody, taskUuid: string) => {
	const { fieldName, value } = taskData;

	return prismaAppClient.task.update({
		where: { id: taskUuid },
		data: {
			[fieldName]: value,
		},
	});
};

export const tasksService = { createTask, getUserTasks, getTaskByUuid, updateTask };
