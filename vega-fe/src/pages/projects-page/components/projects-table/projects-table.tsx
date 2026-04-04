import { ProjectsTableView } from './projects-table.view.tsx';
import { useProjectsTableData } from '../../hooks.ts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getPaginationSelector } from '@/pages/projects-page/selectors.ts';
import { setPagination } from '@/pages/projects-page/slice.ts';

const ProjectsTable = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { projects, pagination, isLoading } = useProjectsTableData();

	const paginationState = useAppSelector(getPaginationSelector());

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/project/${uuid}`);
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
		<ProjectsTableView
			projects={projects}
			isLoading={isLoading}
			pagination={pagination}
			onRowDoubleClick={handleRowDoubleClick}
			onPaginationPageClick={handlePaginationPageClick}
			onPageLimitChange={handlePageLimitChange}
			onPaginationSideButtonsClick={handlePaginationSideButtonsClick}
		/>
	);
};

export { ProjectsTable };
