import { KanbanView } from './kanban.view.tsx';
import { useKanbanTasks } from '../../hooks.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { closestCenter, DndContext, type DragOverEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import type { IKanbanColumns } from '@/pages/tasks-page/types.ts';

const Kanban = () => {
	const [localColumns, setLocalColumns] = useState<Array<IKanbanColumns>>([]);

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

	const { columns, isColumnsLoading } = useKanbanTasks();

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

	return isColumnsLoading ? (
		<CustomLoader />
	) : (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragOver={onDragOver}>
			<KanbanView columns={localColumns} />
		</DndContext>
	);
};

export { Kanban };
