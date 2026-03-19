import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';
import './styles.less';
import { RED_COLOR, TEAL_COLOR } from '../../constants.ts';

interface IProps {
	column: {
		name: string;
		id: string;
		width?: string;
		sorting?: string;
	};
	sortingState: {
		column: string;
		direction: 'asc' | 'desc';
	};
	onSortColumn: (sorting?: string) => void;
}

const CustomTableHederCellView: React.FC<IProps> = ({ column, onSortColumn, sortingState }) => {
	return (
		<div
			className={`custom-table-header-cell${column?.sorting ? ' custom-table-header-cell_sortable' : ''}`}
			onClick={() => onSortColumn(column.sorting)}
		>
			<span className="custom-table-header-cell__title">{column.name}</span>
			{column.sorting === sortingState.column && (
				<div className="custom-table-header-cell__sotring">
					{sortingState.direction === 'asc' ? (
						<ChevronUp size={20} color={TEAL_COLOR} />
					) : (
						<ChevronDown size={20} color={RED_COLOR} />
					)}
				</div>
			)}
		</div>
	);
};

export { CustomTableHederCellView };
