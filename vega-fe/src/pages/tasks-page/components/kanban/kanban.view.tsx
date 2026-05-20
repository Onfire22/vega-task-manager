import type { IKanbanColumns } from '../../types.ts';
import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanColumn } from '@/pages/tasks-page/components/kanban-column/kanban-column.tsx';
import { KanbanTask } from '@/pages/tasks-page/components/kanban-task/kanban-task.tsx';

interface IProps {
	columns?: Array<IKanbanColumns>;
}

const KanbanView: React.FC<IProps> = ({ columns }) => {
	return (
		<div className="h-[calc(100vh-210px)] grid grid-cols-5 gap-3.75">
			{columns?.map((column) => {
				return (
					<SortableContext
						key={column.id}
						id={column.id}
						items={column.tasks.map((i) => i.id)}
						strategy={verticalListSortingStrategy}
					>
						<KanbanColumn column={column}>
							{column.tasks?.map((task) => {
								return <KanbanTask task={task} key={task.id} />;
							})}
						</KanbanColumn>
					</SortableContext>
				);
			})}
		</div>
	);
};

export { KanbanView };
