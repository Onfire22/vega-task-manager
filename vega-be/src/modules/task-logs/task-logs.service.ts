import { transformTimeToSeconds } from '../../common/utils';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { TUpdateTaskTimeBody } from './task-logs.types';

const createTaskLog = async (formData: TUpdateTaskTimeBody, userId: string) => {
	const loggedTime = transformTimeToSeconds(formData?.loggedTime);

	const estimate = transformTimeToSeconds(formData?.estimateTime);

	if (formData.estimateTime && formData.loggedTime) {
		return prismaAppClient.$transaction(async (tx) => {
			let remainingTime = 0;

			if (estimate - loggedTime > 0) {
				remainingTime = estimate - loggedTime;
			}

			await tx.task.update({
				where: { id: formData.taskUuid },
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
						connect: { id: formData.taskUuid },
					},
				},
			});
		});
	}

	return prismaAppClient.$transaction(async (tx) => {
		const task = await tx.task.findUnique({
			where: { id: formData.taskUuid },
			select: { remainingTime: true, estimateTime: true },
		});

		if (task?.estimateTime == null || task?.remainingTime == null) {
			throw new AppError('Нельзя логать время в задачу без оценки', RESPONSE_STATUSES.badRequest);
		}

		const remainingTime = task?.remainingTime - loggedTime;

		await tx.timeLog.create({
			data: {
				loggedTime,
				description: formData?.description,
				user: {
					connect: { id: userId },
				},
				task: {
					connect: { id: formData.taskUuid },
				},
			},
		});

		await tx.task.update({
			where: { id: formData.taskUuid },
			data: { remainingTime },
		});
	});
};

export const taskLogsSService = { createTaskLog };
