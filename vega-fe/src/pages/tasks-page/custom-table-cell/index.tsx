import { CustomTableCellView } from './custom-table-cell-view';
import React from 'react';

interface IProps {
	data: { name: string; color: string };
	columnName: string;
}

const CustomTableCell: React.FC<IProps> = ({ data, columnName }) => {
	return <CustomTableCellView data={data} columnName={columnName} />;
};

export { CustomTableCell };
