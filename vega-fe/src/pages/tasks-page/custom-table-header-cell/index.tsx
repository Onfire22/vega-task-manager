import { CustomTableHederCellView } from './custom-table-heder-cell-view';
import React from 'react';

interface IProps {
	column: {
		name: string;
		id: string;
	};
}

const CustomTableHeaderCell: React.FC<IProps> = ({ column }) => {
	return <CustomTableHederCellView column={column} />;
};

export { CustomTableHeaderCell };
