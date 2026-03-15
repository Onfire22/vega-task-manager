import { TasksView } from './tasks-view';
import { useAppSelector } from '../../../store/hooks.ts';
import { getActiveTabSelector } from '../selectors.ts';
import { TASKS_COMPONENTS } from '../constants.ts';

const Tasks = () => {
	const activeTab = useAppSelector(getActiveTabSelector());

	const component = TASKS_COMPONENTS[activeTab as keyof typeof TASKS_COMPONENTS];

	return <TasksView component={component} />;
};

export { Tasks };
