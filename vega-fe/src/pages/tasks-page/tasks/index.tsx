import { TasksView } from './tasks-view';
import { useAppSelector } from '../../../store/hooks.ts';
import { getActiveTabSelector } from '../selectors.ts';

const Tasks = () => {
	const activeTab = useAppSelector(getActiveTabSelector());

	return <TasksView activeTab={activeTab} />;
};

export { Tasks };
