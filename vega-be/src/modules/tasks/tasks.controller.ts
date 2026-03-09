import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { RESPONSE_STATUSES } from '../../constants';
import { AppError } from '../../errors/errors';
import {
	ICreateTaskBody,
	IEstimateTaskTimeBody,
	IGetTaskParams,
	IGetUserTasksBody,
	ITaskListResponse,
	TUpdateTask,
} from './tasks.types';
import { IDefaultResponse, ILocals } from '../../common/types';
import { DICTIONARY_SELECT, FIELDS_MAP, USER_SELECT } from './constants';
import { transformTimeToSeconds } from './utils';

export const createTask = async (
	req: Request<{}, {}, ICreateTaskBody>,
	res: Response<IDefaultResponse, ILocals>,
	next: NextFunction,
) => {
	try {
		const task = req.body;
		const userId = res.locals.user.id;

		const baseTaskStatusUuid = await prismaAppClient.dictionary.findUnique({
			where: { name_type: { name: 'todo', type: 'TASK_STATUS' } },
			select: { id: true },
		});

		if (!baseTaskStatusUuid) {
			return next(new AppError('Статус не найден', RESPONSE_STATUSES.iternalError));
		}

		const data = {
			...task,
			reporterUuid: userId,
			taskStatusUuid: baseTaskStatusUuid.id,
		};

		const newTask = await prismaAppClient.task.create({ data });

		if (!newTask) {
			next(new AppError('Задача не была создана', RESPONSE_STATUSES.iternalError));
		}

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const getUserTasks = async (
	req: Request<{}, {}, IGetUserTasksBody>,
	res: Response<ITaskListResponse, ILocals>,
	next: NextFunction,
) => {
	try {
		const { isAssignee, sorting } = req.body;

		const userId = res.locals.user.id;

		const tasks = await prismaAppClient.task.findMany({
			where: {
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
				taskPriority: {
					select: DICTIONARY_SELECT,
				},
				taskStatus: {
					select: DICTIONARY_SELECT,
				},
				taskStack: {
					select: DICTIONARY_SELECT,
				},
				estimateTime: true,
				createdAt: true,
			},
		});

		res.status(200).json({ tasks });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const getTaskByUuid = async (req: Request<IGetTaskParams>, res: Response, next: NextFunction) => {
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
			},
			where: { id: uuid },
		});

		res.status(200).json({ task });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const updateTask = async (
	req: Request<{ uuid: string }, {}, TUpdateTask>,
	res: Response,
	next: NextFunction,
) => {
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

export const estimateTaskTime = async (
	req: Request<{ uuid: string }, {}, IEstimateTaskTimeBody>,
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
			const task = await prismaAppClient.task.findUnique({
				where: { id: taskUuid },
				select: { estimateTime: true },
			});

			if (!task?.estimateTime) {
				return next(new AppError('Нельзя логать время в задачу без оценки', RESPONSE_STATUSES.badRequest));
			}

			const remainingTime = task.estimateTime - loggedTime;

			await prismaAppClient.$transaction(async (tx) => {
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
			const task = await prismaAppClient.$transaction(async (tx) => {
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
			return res.status(RESPONSE_STATUSES.success).json({ task });
		}
		return next(new AppError('Invalid request data', RESPONSE_STATUSES.badRequest));
	} catch (e) {
		console.log(e);
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
