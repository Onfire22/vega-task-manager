import type { TDictionariesTypes } from '../../api/types.ts';

export const TASK_FORM_INITIAL_VALUES = {
	title: '',
	description: '',
	taskStackUuid: '',
	taskPriorityUuid: '',
};

export const PROJECT_FORM_INITIAL_VALUES = {
	title: '',
	description: '',
	usersUuids: [],
};

export const BASE_DICTIONARIES_META: TDictionariesTypes[] = ['TASK_PRIORITY', 'STACK_TYPE', 'TASK_STATUS'];
