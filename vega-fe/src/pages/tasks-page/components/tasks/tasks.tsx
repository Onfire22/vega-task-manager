import { TasksView } from './tasks.view.tsx';
import { useAppSelector } from '@/store/hooks.ts';
import { getActiveTabSelector } from '../../selectors.ts';
import { TasksTable } from '@/pages/tasks-page/components/tasks-table/tasks-table.tsx';
import { Kanban } from '@/pages/tasks-page/components/kanban/kanban.tsx';
import { useChangePage } from '@/pages/tasks-page/hooks.ts';

const TASKS_COMPONENTS = {
	table: TasksTable,
	kanban: Kanban,
};

const Tasks = () => {
	useChangePage();

	const activeTab = useAppSelector(getActiveTabSelector());

	const component = TASKS_COMPONENTS[activeTab as keyof typeof TASKS_COMPONENTS];

	return <TasksView component={component} />;
};

export { Tasks };
