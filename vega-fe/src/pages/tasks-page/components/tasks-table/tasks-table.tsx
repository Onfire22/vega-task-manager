import { TasksTableView } from './tasks-table.view.tsx';
import { useUserTasks } from '../../hooks.ts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setPagination } from '@/pages/tasks-page/slice.ts';
import { getPaginationSelector } from '@/pages/tasks-page/selectors.ts';

const TasksTable = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const paginationState = useAppSelector(getPaginationSelector());

	const { userTasks, pagination } = useUserTasks();

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/task/${uuid}`);
	};

	const handlePaginationPageClick = (page: number) => {
		dispatch(
			setPagination({
				...paginationState,
				page,
			}),
		);
	};

	const handlePaginationSideButtonsClick = (side: 'next' | 'prev') => {
		let page = pagination.activePage;
		switch (side) {
			case 'next':
				page += 1;
				break;
			case 'prev':
				page -= 1;
				break;
			default:
				break;
		}

		handlePaginationPageClick(page);
	};

	const handlePageLimitChange = (pageLimit: number) => {
		dispatch(
			setPagination({
				page: 1,
				pageLimit,
			}),
		);
	};

	return (
		<TasksTableView
			tableData={userTasks}
			pagination={pagination}
			onRowDoubleClick={handleRowDoubleClick}
			onPaginationPageClick={handlePaginationPageClick}
			onPageLimitChange={handlePageLimitChange}
			onPaginationSideButtonsClick={handlePaginationSideButtonsClick}
		/>
	);
};

export { TasksTable };
