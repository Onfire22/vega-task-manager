import { CustomTableHederCellView } from './custom-table-header-cell.view.tsx';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { getSortingSelector } from '../../selectors.ts';
import { setSorting } from '../../slice.ts';

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

	const handleSortColumn = (sorting?: string) => {
		if (!sorting) return;
		if (sortingState.column !== sorting) {
			dispatch(setSorting({ column: sorting, direction: 'asc' }));
		} else {
			dispatch(setSorting({ column: sorting, direction: sortingState.direction === 'asc' ? 'desc' : 'asc' }));
		}
	};

	return <CustomTableHederCellView column={column} onSortColumn={handleSortColumn} sortingState={sortingState} />;
};

export { CustomTableHeaderCell };
