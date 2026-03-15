import { Kanban } from './kanban';
import { TasksTable } from './tasks-table';
import type { TDictionariesTypes } from '../../api/types.ts';

export const DATE_FORMAT = 'dd.MM.yyyy';

export const BASE_DICTIONARIES_META: TDictionariesTypes[] = ['TASK_PRIORITY', 'TASK_STATUS', 'TASK_TYPE'];

export const TEAL_COLOR = '#1D9E75';

export const BLUE_COLOR = '#0369ff';

export const TASKS_COMPONENTS = {
	table: TasksTable,
	kanban: Kanban,
};
