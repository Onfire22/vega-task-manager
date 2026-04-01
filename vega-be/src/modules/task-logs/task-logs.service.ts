import { transformTimeToSeconds } from '../tasks/tasks.utils';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { TUpdateTaskTimeBody } from './task-logs.types';

const upsertTaskLog = async (formData: TUpdateTaskTimeBody, taskUuid: string, userId: string) => {
	const estimate = transformTimeToSeconds(formData?.estimateTime);

	const loggedTime = transformTimeToSeconds(formData?.loggedTime);

	//только estimate
	if (formData.estimateTime && !formData.loggedTime) {
		return prismaAppClient.task.update({
			where: { id: taskUuid },
			data: {
				estimateTime: estimate,
				remainingTime: estimate,
			},
		});
	}

	//только log
	if (!formData.estimateTime && formData.loggedTime) {
		return prismaAppClient.$transaction(async (tx) => {
			const task = await tx.task.findUnique({
				where: { id: taskUuid },
				select: { remainingTime: true, estimateTime: true },
			});

			if (!task?.estimateTime || !task.remainingTime) {
				throw new AppError('Нельзя логать время в задачу без оценки', RESPONSE_STATUSES.badRequest);
			}

			const remainingTime = task.remainingTime - loggedTime;

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
	}

	//сразу лог и estimate
	if (formData.estimateTime && formData.loggedTime) {
		return prismaAppClient.$transaction(async (tx) => {
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
	}

	throw new AppError('Invalid request data', RESPONSE_STATUSES.badRequest);
};

export const taskLogsSService = { upsertTaskLog };
