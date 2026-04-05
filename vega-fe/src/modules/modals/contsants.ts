import type { TDictionariesRequest } from '@/api/dictionaries/dictionaries.types.ts';

export const TASK_FORM_INITIAL_VALUES = {
	title: '',
	description: '',
	taskStackUuid: '',
	taskPriorityUuid: '',
	taskProjectUuid: '',
};

export const PROJECT_FORM_INITIAL_VALUES = {
	title: '',
	description: '',
	usersUuids: [],
	deadlineDate: undefined,
};

export const BASE_DICTIONARIES_META: TDictionariesRequest = ['TASK_PRIORITY', 'TASK_TYPE', 'TASK_STATUS'];
