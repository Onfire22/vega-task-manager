import type { IKanbanTasks } from '../../types.ts';
import React from 'react';
import { CustomBadge } from '@/components/common/ui/custom-badge.tsx';
import { cn } from '@/lib/utils.ts';
import { LABELS } from '@/pages/tasks-page/constants.ts';
import { CustomProgress } from '@/components/common/ui/custom-progress.tsx';
import { TEAL_COLOR } from '@/pages/task-page/constants.ts';

interface IProps {
	columns?: Array<IKanbanTasks>;
	onTaskDoubleClick: (uuid: string) => void;
}

const KanbanView: React.FC<IProps> = ({ columns, onTaskDoubleClick }) => {
	return (
		<div>
			<div className="h-full grid grid-cols-5 gap-3.75">
				{columns?.map((column) => {
					return (
						<div key={column.id}>
							<CustomBadge text={column.label} label={column.key} />
							<div className="h-full rounded-[10px] bg-sidebar-accent mt-2">
								<div className="h-[calc(100vh-250px)] flex flex-col gap-2.5 p-2.5 overflow-y-auto scrollbar-custom">
									{column.tasks?.map((task) => {
										return (
											<div
												className="cursor-grab text-[14px] p-2.5 rounded-[5px] flex flex-col justify-between bg-card min-h-42.5"
												key={task.id}
												onDoubleClick={() => onTaskDoubleClick(task.id)}
											>
												<div className="flex items-center justify-between text-[12px] text-muted-foreground">
													<div>{task.createdAt}</div>
													<div>{task.updatedAt}</div>
												</div>
												<div className="flex items-center justify-between text-[12px]">
													<div>{task.code}</div>
													<div
														className={cn(
															LABELS[task.taskStack.key as keyof typeof LABELS],
														)}
													>
														{task.taskStack.label}
													</div>
												</div>
												<div className="kanban__task-title">{task.title}</div>
												<div className="flex items-center justify-between text-[12px]">
													<div>Постановщик</div>
													<div>{task.reporter}</div>
												</div>
												{task.assignee && (
													<div className="flex items-center justify-between text-[12px]">
														<div>Исполнитель</div>
														<div>{task.assignee}</div>
													</div>
												)}
												<CustomProgress
													progress={task.logInfo.totalLoggedTime?.timeInPercents || 0}
													label="Затрачено"
													percents={task.logInfo.totalLoggedTime?.time}
													color={TEAL_COLOR}
													size="h-1"
												/>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { KanbanView };
