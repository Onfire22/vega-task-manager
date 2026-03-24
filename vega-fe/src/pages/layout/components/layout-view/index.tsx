import { Header } from '../header';
import { BaseCustomMenu } from '../base-custom-menu';
import { Sidebar } from '../sidebar';
import { PageContentWrapper } from '../../../../components/common/page-content-wrapper.tsx';
import { Outlet } from 'react-router-dom';
import React from 'react';

interface IProps {
	component: React.ComponentType | null;
}

const LayoutView: React.FC<IProps> = ({ component: ActiveModal }) => {
	return (
		<div>
			<Header menu={<BaseCustomMenu />} />
			<div className="flex items-center">
				<Sidebar />
				<PageContentWrapper>
					<Outlet />
				</PageContentWrapper>
			</div>
			{ActiveModal && <ActiveModal />}
		</div>
	);
};

export { LayoutView };
