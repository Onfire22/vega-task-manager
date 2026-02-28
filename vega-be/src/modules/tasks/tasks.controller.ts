import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { RESPONSE_STATUSES } from '../../constants';
import { AppError } from '../../errors/errors';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const task = req.body;
		const userId = res.locals.user.id;

		const baseTaskStatusUuid = await prismaAppClient.dictionaries.findUnique({
			where: { name_type: { name: 'todo', type: 'TASK_STATUS' } },
			select: { id: true },
		});

		const data = {
			...task,
			reporterUuid: userId,
			taskStatusUuid: baseTaskStatusUuid?.id,
		};

		const newTask = await prismaAppClient.task.create({ data });

		if (!newTask) {
			next(new AppError('Задача не была создана', RESPONSE_STATUSES.iternalError));
		}

		res.status(RESPONSE_STATUSES.success).json({ newTask });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const getUserTasks = async (req: Request, res: Response, next: NextFunction) => {
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

export const getTaskByUuid = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const uuid = req.query.uuid;
		if (typeof uuid !== 'string') {
			next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
			return;
		}

		const task = await prismaAppClient.task.findUnique({
			where: { id: uuid },
		});

		res.status(200).json({ task });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userTask = req.body;
		const task = await prismaAppClient.task.update({
			where: { id: userTask.id },
			data: userTask,
		});
		res.status(200).json({ task });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
