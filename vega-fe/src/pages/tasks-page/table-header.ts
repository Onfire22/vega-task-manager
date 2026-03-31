import { CustomTableHeaderCell } from '@/pages/tasks-page/components/custom-table-header-cell/custom-table-header-cell.tsx';
import { CustomTableCell } from '../../components/common/shared/custom-table-cell.tsx';

export const TABLE_HEADER = [
	{ id: 'code', name: 'Код', width: '110px' },
	{
		id: 'title',
		name: 'Название',
		sorting: 'title',
		customHeaderComponent: CustomTableHeaderCell,
		customCellComponent: CustomTableCell,
	},
	{
		id: 'taskPriority',
		name: 'Приоритет',
		width: '120px',
		sorting: 'taskPriorityUuid',
		customHeaderComponent: CustomTableHeaderCell,
		customCellComponent: CustomTableCell,
	},
	{
		id: 'taskStatus',
		name: 'Статус',
		width: '90px',
		sorting: 'taskStatusUuid',
		customHeaderComponent: CustomTableHeaderCell,
		customCellComponent: CustomTableCell,
	},
	{ id: 'taskStack', name: 'Тэг', width: '70px', customCellComponent: CustomTableCell },
	{ id: 'estimatedTime', name: 'Оценка', width: '100px' },
	{ id: 'loggedTime', name: 'Затрачено', width: '100px' },
	{ id: 'createdAt', name: 'Дата создания', width: '130px' },
];
