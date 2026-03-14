import React from 'react';
import './styles.less';
import { Badge } from '@mantine/core';
import { CELLS_WITH_BADGES, COLORS } from '../constants.ts';

interface IProps {
	data: { label: string; id: string; key: string } | string;
	columnName: string;
}

const CustomTableCellView: React.FC<IProps> = ({ data, columnName }) => {
	if (CELLS_WITH_BADGES.includes(columnName) && typeof data !== 'string') {
		const color = COLORS[data.key as keyof typeof COLORS];

		return (
			<div className="custom-table-cell">
				<Badge fullWidth color={color}>
					{data.label}
				</Badge>
			</div>
		);
	}

	return <div className="custom-table-cell">{data as string}</div>;
};

export { CustomTableCellView };
