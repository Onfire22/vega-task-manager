import { CustomBadge } from '@/components/common/ui/custom-badge.tsx';
import React from 'react';
import type { IKanbanColumns } from '@/pages/tasks-page/types.ts';
import { useDroppable } from '@dnd-kit/core';

interface IProps {
	column: IKanbanColumns;
	children: React.ReactNode;
}

const KanbanColumn: React.FC<IProps> = ({ column, children }) => {
	const { setNodeRef } = useDroppable({ id: column.id });

	return (
		<div>
			<CustomBadge text={column.label} label={column.key} />
			<div ref={setNodeRef} className="h-full rounded-[10px] bg-sidebar-accent mt-2">
				<div className="h-[calc(100vh-260px)] flex flex-col gap-2.5 p-2.5 overflow-y-auto scrollbar-custom">
					{children}
				</div>
			</div>
		</div>
	);
};

export { KanbanColumn };
