import { CustomBadge } from '../../../../components/custom-badge';
import React from 'react';
import { CELLS_WITH_BADGES, PRIORITIES_MAP, STATUS_CELL } from '../../constants.ts';
import './styles.less';

interface IProps {
	data: { name: string; color: string };
	columnName: string;
}

const CustomTableCellView: React.FC<IProps> = ({ data, columnName }) => {
	if (CELLS_WITH_BADGES.includes(columnName)) {
		return (
			<div className="custom-table-cell">
				<CustomBadge color={data.color} text={data.name} />
			</div>
		);
	}
	if (STATUS_CELL === columnName) {
		const Icon = PRIORITIES_MAP[data.name as keyof typeof PRIORITIES_MAP];

		return (
			<div className="custom-table-cell custom-table-cell_status">
				<span>{data.name}</span>
				<Icon color={data.color} size={17} />
			</div>
		);
	}
};

export { CustomTableCellView };
