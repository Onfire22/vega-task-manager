import { Type } from '../../generated/prisma/enums';
import { prismaAppClient } from '../../lib/prisma';
import { TDictionariesTypes, TPayload } from './dictionary.types';

const getDictionaries = async (filters: string) => {
	const filtersList = filters.split(',');

	type TypeKey = keyof typeof Type;

	const validFilters: TypeKey[] = filtersList.filter((f): f is TypeKey => Object.keys(Type).includes(f));

	const dictionaries = await prismaAppClient.dictionary.findMany({
		where: { type: { in: validFilters } },
		select: { uuid: true, label: true, type: true, key: true, description: true },
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

	return {
		taskPriority: dictionariesData.task_priority,
		roleType: dictionariesData.role_type,
		taskStatus: dictionariesData.task_status,
		userSpecialisation: dictionariesData.user_specialisation,
		taskType: dictionariesData.task_type,
		projectStatus: dictionariesData.project_status,
		projectType: dictionariesData.project_type,
	};
};

export const dictionariesService = { getDictionaries };
