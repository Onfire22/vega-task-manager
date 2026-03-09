import { CustomBadge } from '../../../../components/custom-badge';
import React from 'react';
import { CELLS_WITH_BADGES, STATUS_CELL } from '../../constants.ts';
import './styles.less';
import { CustomStatus } from '../../../../components/custom-status';

interface IProps {
	data: { name: string; color: string } | string;
	columnName: string;
}

const CustomTableCellView: React.FC<IProps> = ({ data, columnName }) => {
	if (CELLS_WITH_BADGES.includes(columnName) && typeof data !== 'string') {
		return (
			<div className="custom-table-cell">
				<CustomBadge color={data.color} text={data.name} />
			</div>
		);
	}
	if (STATUS_CELL === columnName && typeof data !== 'string') {
		return (
			<div className="custom-table-cell custom-table-cell_status">
				<CustomStatus size={17} data={data} />
			</div>
		);
	}

	return <div className="custom-table-cell">{data as string}</div>;
};

export { CustomTableCellView };
