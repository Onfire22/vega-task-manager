import { CustomTableCell } from '../../components/common/shared/custom-table-cell.tsx';

export const TABLE_HEADER = [
	{ id: 'code', name: 'Код', width: '110px' },
	{
		id: 'title',
		name: 'Название',
		sorting: 'title',
		customCellComponent: CustomTableCell,
	},
	{
		id: 'taskPriority',
		name: 'Приоритет',
		width: '120px',
		sorting: 'taskPriorityUuid',
		customCellComponent: CustomTableCell,
	},
	{
		id: 'taskStatus',
		name: 'Статус',
		width: '90px',
		sorting: 'taskStatusUuid',
		customCellComponent: CustomTableCell,
	},
	{ id: 'taskStack', name: 'Тэг', width: '70px', customCellComponent: CustomTableCell },
	// { id: 'assignee', name: 'Исполнитель', width: '100px' },
	{ id: 'createdAt', name: 'Дата создания', width: '130px' },
];
