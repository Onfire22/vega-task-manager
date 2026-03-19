import { TasksView } from './tasks-view';
import { useAppSelector } from '../../../store/hooks.ts';
import { getActiveTabSelector } from '../selectors.ts';
import { TasksTable } from '../tasks-table';
import { Kanban } from '../kanban';

const TASKS_COMPONENTS = {
	table: TasksTable,
	kanban: Kanban,
};

const Tasks = () => {
	const activeTab = useAppSelector(getActiveTabSelector());

	const component = TASKS_COMPONENTS[activeTab as keyof typeof TASKS_COMPONENTS];

	return <TasksView component={component} />;
};

export { Tasks };
