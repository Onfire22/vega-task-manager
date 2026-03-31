import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';

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
			className={cn('relative', column?.sorting ? 'cursor-pointer' : '')}
			onClick={() => onSortColumn(column.sorting)}
		>
			<span>{column.name}</span>
			{column.sorting === sortingState.column && (
				<div className="absolute top-0 right-0">
					{sortingState.direction === 'asc' ? (
						<ChevronUp size={20} className="text-teal" />
					) : (
						<ChevronDown size={20} className="text-red" />
					)}
				</div>
			)}
		</div>
	);
};

export { CustomTableHederCellView };
