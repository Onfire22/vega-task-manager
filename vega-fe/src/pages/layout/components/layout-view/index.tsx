import { Header } from '../header';
import { BaseCustomMenu } from '../base-custom-menu';
import { Sidebar } from '../sidebar';
import { PageContentWrapper } from '../../../../components/page-content-wrapper/page-content-wrapper.tsx';
import { Outlet } from 'react-router-dom';
import React from 'react';
import './styles.less';

interface IProps {
	component: React.ComponentType | null;
}

const LayoutView: React.FC<IProps> = ({ component: ActiveModal }) => {
	return (
		<div className="layout">
			<Header menu={<BaseCustomMenu />} />
			<div className="layout__content">
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
