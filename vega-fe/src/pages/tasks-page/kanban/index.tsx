import { KanbanView } from './kanban-view';
import { useDictionaries } from '../../../api/hooks.ts';
import { Loader } from '@mantine/core';

const Kanban = () => {
	const { dictionaries, isDictionariesLoading } = useDictionaries(['TASK_STATUS']);

	return isDictionariesLoading ? <Loader /> : <KanbanView columns={dictionaries?.taskStatus} />;
};

export { Kanban };
