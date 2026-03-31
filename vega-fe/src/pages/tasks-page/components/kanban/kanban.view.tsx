import type { IKanbanTasks } from '../../types.ts';
import React from 'react';

interface IProps {
	columns?: Array<IKanbanTasks>;
	onTaskDoubleClick: (uuid: string) => void;
}

const KanbanView: React.FC<IProps> = ({ columns, onTaskDoubleClick }) => {
	return (
		<div className="kanban">
			<div className="h-full grid grid-cols-5 gap-3.75">
				{columns?.map((column) => {
					return (
						<div className="h-full rounded-[10px] bg-sidebar-accent" key={column.id}>
							<div className="flex items-center">
								<div className="kanban__title"></div>
							</div>
							<div className="h-[calc(100vh-185px)] flex flex-col gap-2.5 p-2.5 overflow-y-auto">
								{column.tasks?.map((task) => {
									return (
										<div
											className="cursor-grab text-[14px] p-2.5 rounded-[5px] flex flex-col gap-2.5"
											key={task.id}
											onDoubleClick={() => onTaskDoubleClick(task.id)}
										>
											<div className="kanban__task-header">
												<div className="kanban__task-code">{task.code}</div>
												<div className="kanban__task-title">{task.title}</div>
											</div>
											<div className="kanban__task-descrription">{task.description}</div>
											<div className="kanban__task-badges">
												<div className="kanban__task-badge"></div>
												<div className="kanban__task-badge"></div>
											</div>
											<div className="kanban__task-dates">{task.createdAt}</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { KanbanView };
