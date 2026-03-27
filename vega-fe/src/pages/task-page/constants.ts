import type { TDictionariesTypes } from '../../api/types.ts';

export const DATE_FORMAT = 'dd.MM.yyyy';

export const TIME_FORMAT = 'HH:mm';

export const DATE_TIME_FORMAT = 'dd.MM.yyyy hh:mm';

export const BASE_DICTIONARIES_META: TDictionariesTypes[] = ['TASK_PRIORITY', 'TASK_TYPE', 'TASK_STATUS'];

export const LOG_TIME_INITIAL_VALUES = {
	loggedTime: '',
	logComment: '',
};

export const INITIAL_FIELD_VALUES = {
	fieldName: '',
	value: '',
};

export const COLORS = {
	medium: '#D98A06',
	low: '#1D9E75',
	high: '#E24B4A',
	highest: '#791F1F',

	todo: '#4752E3',
	in_progress: '#A855F7',
	testing: '#D98A06',
	done: '#1D9E75',
	stopped: '#E24B4A',

	fe: '#4752E3',
	be: '#1D9E75',
	fs: '#A855F7',
	qa: '#D98A06',
	an: '#E24B4A',

	p_backlog: '#fff',
	p_in_progress: '#D98A06',
	p_closed: '#1D9E75',
	p_stopped: '#E24B4A',
};

export const TABS = [
	{
		text: 'Комментарии',
		value: 'comments',
	},
	{
		text: 'Логи',
		value: 'logs',
	},
];
