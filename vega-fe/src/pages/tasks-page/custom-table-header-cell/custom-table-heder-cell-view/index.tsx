import React from 'react';

interface IProps {
	column: {
		name: string;
		id: string;
	};
}

const CustomTableHederCellView: React.FC<IProps> = ({ column }) => {
	return (
		<div className="cutom-table-header-cell">
			<span className="cutom-table-header-cell__title">{column.name}</span>
		</div>
	);
};

export { CustomTableHederCellView };
