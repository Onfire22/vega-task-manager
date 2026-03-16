import type { TDictionariesTypes } from '../../api/types.ts';

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
	deadlineDate: null,
};

export const BASE_DICTIONARIES_META: TDictionariesTypes[] = ['TASK_PRIORITY', 'TASK_TYPE', 'TASK_STATUS'];

export const CALENDAR_SETTINGS = { locale: 'ru' };
