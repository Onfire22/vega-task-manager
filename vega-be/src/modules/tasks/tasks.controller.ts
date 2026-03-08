import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { RESPONSE_STATUSES } from '../../constants';
import { AppError } from '../../errors/errors';
import { ICreateTaskBody, IGetTaskParams, IGetUserTasksBody, ITaskListResponse, TUpdateTask } from './tasks.types';
import { IDefaultResponse, ILocals } from '../../common/types';
import { DICTIONARY_SELECT, FIELDS_MAP, USER_SELECT } from './constants';

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
			next(new AppError('Статус не найден', RESPONSE_STATUSES.iternalError));
			return;
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
				taskPriority: {
					select: DICTIONARY_SELECT,
				},
				taskStatus: {
					select: DICTIONARY_SELECT,
				},
				taskStack: {
					select: DICTIONARY_SELECT,
				},
				estimatedTime: true,
				loggedTime: true,
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
				estimatedTime: true,
				loggedTime: true,
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
