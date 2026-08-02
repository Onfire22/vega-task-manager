import { Header } from '../header/header.tsx';
import { BaseCustomMenu } from '../base-custom-menu/base-custom-menu.tsx';
import { Sidebar } from '../sidebar/sidebar.tsx';
import { PageContentWrapper } from '@/components/common/shared/page-content-wrapper.tsx';
import { Outlet } from 'react-router-dom';
import { ProjectModal, TaskModal } from '@/modules/modals';
import { useChatSocket } from '@/pages/chat/websocket.ts';

const LayoutView = () => {
	// useChatSocket();

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
