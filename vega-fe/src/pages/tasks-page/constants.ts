import type { TDictionariesTypes } from '../../api/types.ts';

export const INITIAL_VALUES = {
	title: '',
	description: '',
	taskStackUuid: '',
	taskPriorityUuid: '',
};

export const RED_COLOR = '#fa5252';

export const TEAL_COLOR = '#12b886';

export const YELLOW_COLOR = '#fab005';

export const BLUE_COLOR = '#0369ff';

export const DATE_FORMAT = 'dd.MM.yyyy';

export const BASE_DICTIONARIES_META: TDictionariesTypes[] = ['TASK_PRIORITY', 'STACK_TYPE', 'TASK_STATUS'];

export const CELLS_WITH_BADGES = ['taskStatusUuid', 'taskStackUuid'];

export const PROJECT_INITIAL_VALUES = {
	title: '',
	description: '',
};
