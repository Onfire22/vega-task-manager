import type { TDictionariesTypes } from '../../api/types.ts';

export const DATE_FORMAT = 'dd.MM.yyyy';

export const BASE_DICTIONARIES_META: TDictionariesTypes[] = ['TASK_PRIORITY', 'TASK_STATUS', 'TASK_TYPE'];

export const TEAL_COLOR = '#1D9E75';

export const BLUE_COLOR = '#0369ff';

export const RED_COLOR = '#E24B4A';

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
