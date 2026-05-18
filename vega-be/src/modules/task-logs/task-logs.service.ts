import { isDateEquals, transformSecondsToTime, transformTimeToSeconds } from '../../common/utils';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../common/constants';
import { TCreateTaskTimeBody } from './task-logs.types';

const createTaskLog = async (formData: TCreateTaskTimeBody, userId: string) => {
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

const getTaskLogs = async (taskUuid: string) => {
	const taskLogs = await prismaAppClient.timeLog.findMany({
		where: {
			taskUuid,
		},
		select: {
			id: true,
			loggedTime: true,
			description: true,
			createdAt: true,
			updatedAt: true,
			user: {
				select: {
					id: true,
					name: true,
					secondName: true,
					userName: true,
					avatarUrl: true,
				},
			},
		},
	});

	return taskLogs.map((log) => {
		const { updatedAt, ...rest } = log;
		return {
			...rest,
			...(!isDateEquals(log.createdAt, updatedAt) ? {} : { updatedAt: log.updatedAt }),
			loggedTime: log.loggedTime ? transformSecondsToTime(log.loggedTime) : null,
			loggedTimeInSecs: log.loggedTime,
		};
	});
};

export const taskLogsService = { createTaskLog, getTaskLogs };
