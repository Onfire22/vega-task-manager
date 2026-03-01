import React from 'react';
import { Drawer, NavLink } from '@mantine/core';
import './styles.less';
import { LINKS } from '../../../contsants.ts';
import { IconLogout2 } from '@tabler/icons-react';

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
						{LINKS.map(({ href, label, color, icon: Icon }) => (
							<NavLink
								key={href}
								href={href}
								label={label}
								color={color}
								active={pathname === href}
								leftSection={<Icon />}
							/>
						))}
					</div>
				</div>
				<NavLink
					className="sidebar__exit"
					label="Выход"
					leftSection={<IconLogout2 />}
					onClick={onLogOutClick}
				/>
			</aside>
		</Drawer>
	);
};

export { SidebarView };
