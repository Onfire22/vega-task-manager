import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { RESPONSE_STATUSES } from '../../constants';
import { AppError } from '../../errors/errors';
import { ICreateTaskBody, IGetTaskParams, IGetUserTasksBody, ITasksResponse, TUpdateTask } from './tasks.types';
import { IDefaultResponse, ILocals } from '../../common/types';

export const createTask = async (
	req: Request<{}, {}, ICreateTaskBody>,
	res: Response<IDefaultResponse, ILocals>,
	next: NextFunction,
) => {
	try {
		const task = req.body;
		const userId = res.locals.user.id;

		const baseTaskStatusUuid = await prismaAppClient.dictionaries.findUnique({
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
	res: Response<ITasksResponse, ILocals>,
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
		console.log(req.body, req.params);

		const task = await prismaAppClient.task.update({
			where: { id: req.params.uuid },
			data: req.body,
		});

		res.status(200).json({ task });
	} catch (e) {
		console.log(e);
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
