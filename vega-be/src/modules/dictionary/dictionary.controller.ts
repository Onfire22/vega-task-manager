import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { Type } from '../../generated/prisma/enums';
import { IDictionaryReqQuery, IDictionaryResponse, TDictionariesTypes, TPayload } from './dictionary.types';

export const getDictionaries = async (
	req: Request<{}, {}, {}, IDictionaryReqQuery>,
	res: Response<IDictionaryResponse>,
	next: NextFunction,
) => {
	try {
		if (!req.query.filters) {
			next(new AppError('You need to chose dictionaries types', RESPONSE_STATUSES.notFound));
			return;
		}

		const filters = req.query.filters.split(',');

		type TypeKey = keyof typeof Type;

		const validFilters: TypeKey[] = filters.filter((f): f is TypeKey => Object.keys(Type).includes(f));

		const dictionaries = await prismaAppClient.dictionary.findMany({
			where: { type: { in: validFilters } },
			select: { id: true, name: true, color: true, type: true, fullName: true },
		});

		const dictionariesData = dictionaries.reduce((acc, item) => {
			const dictionaryType = item.type.toLowerCase();
			if (!acc[dictionaryType as TDictionariesTypes]) {
				acc[dictionaryType as TDictionariesTypes] = [];
			}
			const { type, ...rest } = item;
			acc[dictionaryType as TDictionariesTypes].push(rest);

			return acc;
		}, {} as TPayload);

		const payload = {
			taskPriority: dictionariesData.task_priority,
			roleType: dictionariesData.role_type,
			stackType: dictionariesData.stack_type,
			taskStatus: dictionariesData.task_status,
		};

		res.status(RESPONSE_STATUSES.success).json({ dictionaries: payload });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
