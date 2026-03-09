import type { IKanbanTasks } from '../../types.ts';
import React from 'react';
import { CustomBadge } from '../../../../components/custom-badge';
import './styles.less';

interface IProps {
	columns?: Array<IKanbanTasks>;
	onTaskDoubleClick: (uuid: string) => void;
}

const KanbanView: React.FC<IProps> = ({ columns, onTaskDoubleClick }) => {
	return (
		<div className="kanban">
			<div className="kanban__columns">
				{columns?.map((column) => {
					return (
						<div className="kanban__column" key={column.id}>
							<div className="kanban__header">
								<div className="kanban__title">
									<CustomBadge color={column.color} text={column.name} />
								</div>
							</div>
							<div className="kanban__content">
								{column.tasks?.map((task) => {
									return (
										<div
											className="kanban__task"
											key={task.id}
											onDoubleClick={() => onTaskDoubleClick(task.id)}
										>
											<div className="kanban__task-header">
												<div className="kanban__task-code">{task.code || 'CODE-123:'}</div>
												<div className="kanban__task-title">{task.title}</div>
											</div>
											<div className="kanban__task-descrription">{task.description}</div>
											<div className="kanban__task-badges">
												<div className="kanban__task-badge">
													<CustomBadge
														text={task.taskStack.name}
														color={task.taskStack.color}
													/>
												</div>
												<div className="kanban__task-badge">
													<CustomBadge
														text={task.taskPriority.name}
														color={task.taskPriority.color}
													/>
												</div>
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
