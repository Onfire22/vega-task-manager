import { Header } from '../header';
import { BaseCustomMenu } from '../base-custom-menu';
import { Sidebar } from '../sidebar';
import { PageContentWrapper } from '../../../../components/common/shared/page-content-wrapper.tsx';
import { Outlet } from 'react-router-dom';
import { ProjectModal, TaskModal } from '@/modules/modals';

const LayoutView = () => {
	return (
		<div>
			<Header menu={<BaseCustomMenu />} />
			<div className="flex items-center">
				<Sidebar />
				<PageContentWrapper>
					<Outlet />
				</PageContentWrapper>
			</div>
			<ProjectModal />
			<TaskModal />
		</div>
	);
};

export { LayoutView };
