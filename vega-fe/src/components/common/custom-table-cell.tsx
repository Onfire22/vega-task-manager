import React from 'react';
import { CustomBadge } from '@/components/common/custom-badge.tsx';
import { CustomProgress } from '@/components/common/custom-progress.tsx';

const CELLS_WITH_BADGES = ['taskStatus', 'taskStack', 'taskPriority', 'projectStatus'];

const PROGRESS_CELL = 'projectProgress';

interface IProps {
	data: { label: string; id: string; key: string } | string;
	columnName: string;
}

const CustomTableCell: React.FC<IProps> = ({ data, columnName }) => {
	if (CELLS_WITH_BADGES.includes(columnName) && typeof data !== 'string' && typeof data !== 'number') {
		return (
			<div className="text-start whitespace-nowrap px-1.25">
				<CustomBadge text={data.label} label={data.key} />
			</div>
		);
	}

	if (PROGRESS_CELL === columnName && typeof data === 'number') {
		return <CustomProgress progress={data} />;
	}

	return <div className="text-start whitespace-nowrap px-1.25">{data as string}</div>;
};

export { CustomTableCell };
