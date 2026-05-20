import React from 'react';
import type { ITask } from '@/pages/tasks-page/types.ts';
import { cn } from '@/lib/utils.ts';
import { LABELS } from '@/pages/tasks-page/constants.ts';
import { CustomProgress } from '@/components/common/ui/custom-progress.tsx';
import { TEAL_COLOR } from '@/pages/task-page/constants.ts';

interface IProps {
	task: ITask;
}

const KanbanTaskOverlay: React.FC<IProps> = ({ task }) => {
	return (
		<div className="cursor-grabbing text-[14px] p-2.5 rounded-[5px] flex flex-col justify-between bg-card min-h-42.5">
			<div
				className="cursor-grab text-[14px] p-2.5 rounded-[5px] flex flex-col justify-between bg-card min-h-42.5"
				key={task.id}
			>
				<div className="flex items-center justify-between text-[12px] text-muted-foreground">
					<div>{task.createdAt}</div>
					<div>{task.updatedAt}</div>
				</div>
				<div className="flex items-center justify-between text-[12px]">
					<div>{task.code}</div>
					<div className={cn(LABELS[task.taskStack.key as keyof typeof LABELS])}>{task.taskStack.label}</div>
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
		</div>
	);
};

export { KanbanTaskOverlay };
