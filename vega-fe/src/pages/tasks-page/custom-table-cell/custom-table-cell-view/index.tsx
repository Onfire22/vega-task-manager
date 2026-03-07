import { CustomBadge } from '../../../../components/custom-badge';
import React from 'react';
import { CELLS_WITH_BADGES, STATUS_CELL } from '../../constants.ts';
import './styles.less';
import { CustomStatus } from '../../../../components/custom-status';

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
		return (
			<div className="custom-table-cell custom-table-cell_status">
				<CustomStatus size={17} data={data} />
			</div>
		);
	}
};

export { CustomTableCellView };
