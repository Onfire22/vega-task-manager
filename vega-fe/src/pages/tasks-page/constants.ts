import type { TDictionariesRequest } from '@/api/dictionaries/dictionaries.types.ts';

export const DATE_FORMAT = 'dd.MM.yyyy';

export const BASE_DICTIONARIES_META: TDictionariesRequest = ['TASK_PRIORITY', 'TASK_TYPE', 'TASK_STATUS'];

export const FILTERS_COLORS = {
	taskPriorityUuid: '#1D9E75',
	taskStatusUuid: '#0369ff',
	taskStackUuid: '#D98A06',
};

export const FILTERS_INITIAL_VALUES = {
	taskPriorityUuid: {},
	taskStatusUuid: {},
	taskStackUuid: {},
};

export const TABS = [
	{
		text: 'Таблица',
		value: 'table',
	},
	{
		text: 'Канбан',
		value: 'kanban',
	},
];
