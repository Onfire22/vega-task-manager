import { IconBriefcase2, IconCancel, IconCircleCheck, IconPencil } from '@tabler/icons-react';

export const BULLET_ICONS = {
	todo: IconPencil,
	in_progress: IconBriefcase2,
	done: IconCircleCheck,
	stopped: IconCancel,
} as const;

export const TASK_STATUS_NUMBER = {
	todo: 0,
	in_progress: 1,
	done: 2,
	stopped: 3,
} as const;

export const DATE_FORMAT = 'dd.MM.yyyy';

export const SELECT_FIELDS = ['stackType', 'taskPriority'];

export const LOG_TIME_INITIAL_VALUES = {
	estimate: '',
	loggedTime: '',
	logComment: '',
};

export const USER_FIELD = 'assignee';

export const RED_COLOR = '#fa5252';

export const GREEN_COLOR = '#40c057';

export const INITIAL_FIELD_VALUES = {
	fieldName: '',
	value: '',
};
