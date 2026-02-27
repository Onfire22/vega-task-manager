import { CustomTableHederCellView } from './custom-table-heder-cell-view';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { getSortingSelector } from '../selectors.ts';
import { setSorting } from '../slice.ts';

interface IProps {
	column: {
		name: string;
		id: string;
		width?: string;
		sorting?: string;
	};
}

const CustomTableHeaderCell: React.FC<IProps> = ({ column }) => {
	const dispatch = useAppDispatch();
	const sortingState = useAppSelector(getSortingSelector());

	const handleSortColumn = (id: string) => {
		if (!id) return;
		if (sortingState.column !== id) {
			dispatch(setSorting({ column: id, direction: 'asc' }));
		} else {
			dispatch(setSorting({ column: id, direction: sortingState.direction === 'asc' ? 'desc' : 'asc' }));
		}
	};

	return <CustomTableHederCellView column={column} onSortColumn={handleSortColumn} sortingState={sortingState} />;
};

export { CustomTableHeaderCell };
