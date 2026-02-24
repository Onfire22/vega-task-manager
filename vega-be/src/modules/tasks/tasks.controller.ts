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

		res.status(RESPONSE_STATUSES.success).json({ success: true, payload: newTask });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const getUserTasks = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user.id;
		const withAssignee = req.query.withAssignee === 'true';

		const tasks = await prismaAppClient.task.findMany({
			where: {
				...(withAssignee ? { assigneeUuid: userId } : { reporterUuid: userId }),
			},
		});

		res.status(200).json({ success: true, payload: tasks });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
