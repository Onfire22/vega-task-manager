import { KanbanView } from './kanban.view.tsx';
import { useKanbanTasks } from '../../hooks.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import {
	closestCorners,
	DndContext,
	type DragEndEvent,
	type DragOverEvent,
	DragOverlay,
	type DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { useEffect, useRef, useState } from 'react';
import type { IKanbanColumns } from '@/pages/tasks-page/types.ts';
import type { ITask } from '@/pages/tasks-page/types.ts';
import { KanbanTask } from '@/pages/tasks-page/components/kanban-task/kanban-task.tsx';
import { useUpdateTaskMutation } from '@/api/tasks/tasks.api.ts';
import { arrayMove } from '@dnd-kit/sortable';

const Kanban = () => {
	const [localColumns, setLocalColumns] = useState<Array<IKanbanColumns>>([]);
	const [activeTask, setActiveTask] = useState<ITask | null>(null);
	const fromContainerIdRef = useRef<string | null>(null);

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

	const { columns, isColumnsLoading } = useKanbanTasks();

	const [updateTask] = useUpdateTaskMutation();

	useEffect(() => {
		if (columns) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setLocalColumns(columns);
		}
	}, [columns]);

	const onDragOver = ({ active, over }: DragOverEvent) => {
		if (!over) return;

		const activeColumn = localColumns?.find((column) => column.tasks.some((task) => task.id === active.id));

		const overColumn = localColumns?.find(
			(column) => column.tasks.some((task) => task.id === over.id) || column.id === over.id,
		);

		if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return;

		setLocalColumns((prev) => {
			const activeTask = activeColumn.tasks.find((task) => task.id === active.id);
			if (!activeTask) return prev;
			const overTaskIndex = overColumn.tasks.findIndex((task) => task.id === over.id);

			return prev.map((column) => {
				if (column.id === activeColumn.id) {
					return { ...column, tasks: column.tasks.filter((task) => task.id !== active.id) };
				}
				if (column.id === overColumn.id) {
					const newTasks = [...column.tasks];
					newTasks.splice(overTaskIndex >= 0 ? overTaskIndex : newTasks.length, 0, activeTask);
					return { ...column, tasks: newTasks };
				}
				return column;
			});
		});
	};

	const onDragStart = ({ active }: DragStartEvent) => {
		fromContainerIdRef.current = active.data.current?.sortable?.containerId;
		const task = localColumns.flatMap((col) => col.tasks).find((t) => t.id === active.id);
		setActiveTask(task ?? null);
	};

	const onDragEnd = ({ active, over }: DragEndEvent) => {
		setActiveTask(null);
		if (!over || active.id === over.id) return;

		const fromContainerId = fromContainerIdRef.current;
		const toContainerId = over.data.current?.sortable?.containerId ?? over.id;

		console.log({ fromContainerId, toContainerId, equal: fromContainerId === toContainerId });

		if (fromContainerId === toContainerId) {
			setLocalColumns((prev) =>
				prev.map((col) => {
					if (col.id !== fromContainerId) return col;
					const oldIndex = col.tasks.findIndex((t) => t.id === active.id);
					const newIndex = col.tasks.findIndex((t) => t.id === over.id);
					return { ...col, tasks: arrayMove(col.tasks, oldIndex, newIndex) };
				}),
			);
			return;
		}

		const column = localColumns.find((col) => col.id === toContainerId);
		updateTask({ fields: { taskStatusUuid: column?.id }, uuid: String(active.id) });
	};

	return isColumnsLoading ? (
		<CustomLoader />
	) : (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragOver={onDragOver}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<KanbanView columns={localColumns} />
			<DragOverlay>{activeTask ? <KanbanTask task={activeTask} /> : null}</DragOverlay>
		</DndContext>
	);
};

export { Kanban };
