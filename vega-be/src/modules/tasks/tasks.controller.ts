import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { RESPONSE_STATUSES } from '../../constants';
import { AppError } from '../../errors/errors';
import { TCreateTaskBody, TTaskParams, TUpdateTaskBody, TUpdateTaskTimeBody, TUserTasksBody } from './tasks.types';
import { IDefaultResponse, ILocals } from '../../common/types';
import { FIELDS_MAP } from './constants';
import { getTaskWithTransformedTime, transformTimeToSeconds } from './utils';
import { DICTIONARY_SELECT, USER_SELECT } from '../../common/constants';

export const createTask = async (
	req: Request<{}, {}, TCreateTaskBody>,
	res: Response<IDefaultResponse, ILocals>,
	next: NextFunction,
) => {
	try {
		const { taskProjectUuid, ...task } = req.body;
		const userId = res.locals.user.id;

		if (!taskProjectUuid) {
			return next(new AppError('Задачу можно создать только в проекте', RESPONSE_STATUSES.iternalError));
		}

		const baseTaskStatusUuid = await prismaAppClient.dictionary.findUnique({
			where: { key_type: { key: 'todo', type: 'TASK_STATUS' } },
			select: { id: true },
		});

		if (!baseTaskStatusUuid) {
			return next(new AppError('Статус не найден', RESPONSE_STATUSES.iternalError));
		}

		await prismaAppClient.$transaction(async (tx) => {
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
				next(new AppError('Задача не была создана', RESPONSE_STATUSES.iternalError));
			}
		});

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		console.log(e);
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const getUserTasks = async (req: Request<{}, {}, TUserTasksBody>, res: Response, next: NextFunction) => {
	try {
		const { isAssignee, sorting, filters } = req.body;

		const filtersData = Object.keys(filters).length > 0 ? filters : null;

		const where = filtersData
			? Object.fromEntries(Object.entries(filtersData).map(([key, value]) => [key, { in: value }]))
			: {};

		const userId = res.locals.user.id;

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

		const transformedTasks = tasks.map((task) => getTaskWithTransformedTime(task));

		res.status(200).json({ tasks: transformedTasks });
	} catch (e) {
		console.log(e);
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const getTaskByUuid = async (req: Request<TTaskParams>, res: Response, next: NextFunction) => {
	try {
		const uuid = req.params.uuid;

		if (!uuid) {
			return next(new AppError('missing task uuid', RESPONSE_STATUSES.iternalError));
		}

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
			where: { id: uuid },
		});

		if (task) {
			const transformedTask = getTaskWithTransformedTime(task);
			return res.status(200).json({ task: transformedTask });
		}

		next(new AppError('Task not found', RESPONSE_STATUSES.notFound));
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const updateTask = async (req: Request<TTaskParams, {}, TUpdateTaskBody>, res: Response, next: NextFunction) => {
	try {
		const { fieldName, value } = req.body;

		const task = await prismaAppClient.task.update({
			where: { id: req.params.uuid },
			data: {
				[FIELDS_MAP[fieldName]]: value,
			},
		});

		res.status(200).json({ task });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const updateTaskTime = async (
	req: Request<TTaskParams, {}, TUpdateTaskTimeBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const formData = req.body;

		const { uuid: taskUuid } = req.params;

		const userId = res.locals.user.id;

		const estimate = transformTimeToSeconds(formData?.estimateTime);

		const loggedTime = transformTimeToSeconds(formData?.loggedTime);

		if (!taskUuid) {
			return next(new AppError('missing task uuid', RESPONSE_STATUSES.iternalError));
		}

		//только estimate
		if (formData.estimateTime && !formData.loggedTime) {
			const task = await prismaAppClient.task.update({
				where: { id: taskUuid },
				data: {
					estimateTime: estimate,
					remainingTime: estimate,
				},
			});

			return res.status(RESPONSE_STATUSES.success).json({ task });
		}

		//только log
		if (!formData.estimateTime && formData.loggedTime) {
			await prismaAppClient.$transaction(async (tx) => {
				const task = await prismaAppClient.task.findUnique({
					where: { id: taskUuid },
					select: { estimateTime: true },
				});

				if (!task?.estimateTime) {
					return next(new AppError('Нельзя логать время в задачу без оценки', RESPONSE_STATUSES.badRequest));
				}

				const remainingTime = task.estimateTime - loggedTime;

				await tx.timeLog.create({
					data: {
						loggedTime,
						description: formData?.description,
						user: {
							connect: { id: userId },
						},
						task: {
							connect: { id: taskUuid },
						},
					},
				});

				await tx.task.update({
					where: { id: taskUuid },
					data: { remainingTime },
				});
			});

			return res.status(RESPONSE_STATUSES.success).json({ success: true });
		}

		//сразу лог и estimate
		if (formData.estimateTime && formData.loggedTime) {
			await prismaAppClient.$transaction(async (tx) => {
				const remainingTime = estimate - loggedTime;

				await tx.task.update({
					where: { id: taskUuid },
					data: { estimateTime: estimate, remainingTime },
				});

				await tx.timeLog.create({
					data: {
						loggedTime,
						description: formData?.description,
						user: {
							connect: { id: userId },
						},
						task: {
							connect: { id: taskUuid },
						},
					},
				});
			});
			return res.status(RESPONSE_STATUSES.success).json({ success: true });
		}
		return next(new AppError('Invalid request data', RESPONSE_STATUSES.badRequest));
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
