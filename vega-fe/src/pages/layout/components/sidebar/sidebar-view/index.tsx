import React from 'react';
import { Drawer } from '@mantine/core';
import './styles.less';
import { LINKS } from '../../../contsants.ts';
import { IconLogout2 } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

interface IProps {
	isSidebarOpened: boolean;
	pathname: string;
	onCloseSidebar: () => void;
	onLogOutClick: () => void;
	userData: { name?: string; secondName?: string };
}

const SidebarView: React.FC<IProps> = ({ isSidebarOpened, onCloseSidebar, pathname, onLogOutClick, userData }) => {
	return (
		<Drawer size="xs" opened={isSidebarOpened} onClose={onCloseSidebar} title="Vega">
			<aside className="sidebar">
				<div className="sidebar__content">
					<div className="sidebar__profile">
						<div className="sidebar__avatar" />
						<p className="sidebar__name">{`${userData.name} ${userData.secondName}`}</p>
					</div>
					<div className="sidebar__links">
						{LINKS.map(({ href, label, icon: Icon }) => (
							<Link
								className={`sidebar__link ${pathname === href ? ' sidebar__link_active' : ''}`}
								key={href}
								to={href}
								onClick={onCloseSidebar}
							>
								<Icon />
								{label}
							</Link>
						))}
					</div>
				</div>
				<a className="sidebar__link" onClick={onLogOutClick}>
					<IconLogout2 />
					<span>Выход</span>
				</a>
			</aside>
		</Drawer>
	);
};

export { SidebarView };
