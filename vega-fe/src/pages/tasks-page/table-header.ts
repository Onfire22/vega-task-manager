import { CustomTableHeaderCell } from './custom-table-header-cell';
import { CustomTableCell } from './custom-table-cell';

export const TABLE_HEADER = [
	{ id: 'code', name: 'Код', width: '110px' },
	{ id: 'title', name: 'Название', sorting: 'title', customHeaderComponent: CustomTableHeaderCell },
	{
		id: 'taskPriorityUuid',
		name: 'Приоритет',
		width: '120px',
		sorting: 'taskPriorityUuid',
		customHeaderComponent: CustomTableHeaderCell,
		customCellComponent: CustomTableCell,
	},
	{
		id: 'taskStatusUuid',
		name: 'Статус',
		width: '90px',
		sorting: 'taskStatusUuid',
		customHeaderComponent: CustomTableHeaderCell,
		customCellComponent: CustomTableCell,
	},
	{ id: 'taskStackUuid', name: 'Тэг', width: '70px', customCellComponent: CustomTableCell },
	{ id: 'estimatedTime', name: 'Оценка', width: '100px' },
	{ id: 'loggedTime', name: 'Затрачено', width: '100px' },
	{ id: 'createdAt', name: 'Дата создания', width: '130px' },
];
