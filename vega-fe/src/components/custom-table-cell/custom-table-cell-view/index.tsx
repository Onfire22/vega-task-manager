import React from 'react';
import './styles.less';
import { Progress } from '@mantine/core';
import { CELLS_WITH_BADGES, PROGRESS_CELL } from '../constants.ts';
import { CustomBadge } from '../../custom-badge';

interface IProps {
	data: { label: string; id: string; key: string } | string | number;
	columnName: string;
}

const CustomTableCellView: React.FC<IProps> = ({ data, columnName }) => {
	if (CELLS_WITH_BADGES.includes(columnName) && typeof data !== 'string' && typeof data !== 'number') {
		return (
			<div className="custom-table-cell">
				<CustomBadge text={data.label} label={data.key} isFullWidth />
			</div>
		);
	}

	if (PROGRESS_CELL === columnName && typeof data === 'number') {
		return (
			<div className="custom-table-cell custom-table-cell__progress">
				<Progress value={data} size="xs" className="custom-table-cell__bar" />
				<span className="custom-table-cell__text">{data} %</span>
			</div>
		);
	}

	return <div className="custom-table-cell">{data as string}</div>;
};

export { CustomTableCellView };
