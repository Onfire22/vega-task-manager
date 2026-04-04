import { TasksTableView } from './tasks-table.view.tsx';
import { useUserTasks } from '../../hooks.ts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks.ts';
import { setPagination } from '@/pages/tasks-page/slice.ts';
import { getPaginationSelector } from '@/pages/tasks-page/selectors.ts';
import { usePaginationHandlers } from '@/components/common/ui/custom-pagination.tsx';

const TasksTable = () => {
	const navigate = useNavigate();

	const paginationState = useAppSelector(getPaginationSelector());

	const { userTasks, pagination } = useUserTasks();

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/task/${uuid}`);
	};

	const { handlePageClick, handleSideButtonClick, handlePageLimitChange } = usePaginationHandlers(
		paginationState,
		setPagination,
	);

	return (
		<TasksTableView
			tableData={userTasks}
			pagination={pagination}
			onRowDoubleClick={handleRowDoubleClick}
			onPageClick={handlePageClick}
			onPageLimitChange={handlePageLimitChange}
			onSideButtonClick={handleSideButtonClick}
		/>
	);
};

export { TasksTable };
