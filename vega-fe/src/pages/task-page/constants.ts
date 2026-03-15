import type { TDictionariesTypes } from '../../api/types.ts';

export const DATE_FORMAT = 'dd.MM.yyyy';

export const DATE_TIME_FORMAT = 'dd.MM.yyyy hh:mm';

export const BASE_DICTIONARIES_META: TDictionariesTypes[] = ['TASK_PRIORITY', 'TASK_TYPE', 'TASK_STATUS'];

export const LOG_TIME_INITIAL_VALUES = {
	loggedTime: '',
	logComment: '',
};

export const RED_COLOR = '#E24B4A';

export const GREEN_COLOR = '#1D9E75';

export const BLUE_COLOR = '#4752E3';

export const INITIAL_FIELD_VALUES = {
	fieldName: '',
	value: '',
};

export const TASK_TYPES = [
	{ value: 'fe', color: '#4752E3' },
	{ value: 'be', color: '#1D9E75' },
	{ value: 'fs', color: '#A855F7' },
	{ value: 'qa', color: '#D98A06' },
	{ value: 'an', color: '#E24B4A' },
];

export const TASK_PRIORITIES = [
	{ value: 'low', color: '#1D9E75' },
	{ value: 'medium', color: '#D98A06' },
	{ value: 'high', color: '#E24B4A' },
	{ value: 'highest', color: '#791F1F' },
];

export const TASK_STATUSES = [
	{ value: 'todo', color: '#4752E3' },
	{ value: 'in_progress', color: '#A855F7' },
	{ value: 'testing', color: '#D98A06' },
	{ value: 'done', color: '#1D9E75' },
	{ value: 'stopped', color: '#E24B4A' },
];
