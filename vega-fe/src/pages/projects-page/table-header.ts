import { CustomTableCell } from '../../components/custom-table-cell';

export const TABLE_HEADER = [
	{ id: 'code', name: 'Код', width: '100px' },
	{ id: 'title', name: 'Название', width: '370px' },
	{ id: 'projectStatus', name: 'Статус', width: '170px', customCellComponent: CustomTableCell },
	{ id: 'owner', name: 'Владелец' },
	{ id: 'projectProgress', name: 'Прогресс', width: '370px', customCellComponent: CustomTableCell },
	{ id: 'createdAt', name: 'Дата создания' },
];
