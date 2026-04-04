import { ProjectsTableView } from './projects-table.view.tsx';
import { useProjectsTableData } from '../../hooks.ts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks.ts';
import { getPaginationSelector } from '@/pages/projects-page/selectors.ts';
import { setPagination } from '@/pages/projects-page/slice.ts';
import { usePaginationHandlers } from '@/components/common/ui/custom-pagination.tsx';

const ProjectsTable = () => {
	const navigate = useNavigate();

	const { projects, pagination, isLoading } = useProjectsTableData();

	const paginationState = useAppSelector(getPaginationSelector());

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/project/${uuid}`);
	};

	const { handlePageClick, handleSideButtonClick, handlePageLimitChange } = usePaginationHandlers(
		paginationState,
		setPagination,
	);

	return (
		<ProjectsTableView
			projects={projects}
			isLoading={isLoading}
			pagination={pagination}
			onRowDoubleClick={handleRowDoubleClick}
			onPageClick={handlePageClick}
			onPageLimitChange={handlePageLimitChange}
			onSideButtonClick={handleSideButtonClick}
		/>
	);
};

export { ProjectsTable };
