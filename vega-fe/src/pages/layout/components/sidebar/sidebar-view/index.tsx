import React from 'react';
import './styles.less';
import { BOTTOM_LINKS, TOP_LINKS } from '../../../contsants.ts';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mantine/core';

interface IProps {
	pathname: string;
	isSidebarOpened: boolean;
	onLogOutClick: () => void;
}

const SidebarView: React.FC<IProps> = ({ pathname, onLogOutClick, isSidebarOpened }) => {
	return (
		<nav className={`sidebar${isSidebarOpened ? ' sidebar_expanded' : ''}`}>
			<ul className="sidebar__menu">
				{TOP_LINKS.map((link) => {
					const Icon = link.icon;

					return isSidebarOpened ? (
						<li
							className={`sidebar__item${link.activeRoutes.includes(pathname) ? ' sidebar__item_active' : ''}`}
							key={link.href}
						>
							<Link
								to={link.href}
								className={`sidebar__link${link.activeRoutes.includes(pathname) ? ' sidebar__link_active' : ''} sidebar__link_expanded`}
							>
								<Icon />
								<span>{link.label}</span>
							</Link>
						</li>
					) : (
						<Tooltip label={link.label} key={link.href} position="right">
							<li
								className={`sidebar__item${link.activeRoutes.includes(pathname) ? ' sidebar__item_active' : ''}`}
							>
								<Link
									to={link.href}
									className={`sidebar__link${link.activeRoutes.includes(pathname) ? ' sidebar__link_active' : ''}`}
								>
									<Icon />
								</Link>
							</li>
						</Tooltip>
					);
				})}
			</ul>
			<ul className="sidebar__menu">
				{BOTTOM_LINKS.map((link) => {
					const Icon = link.icon;
					return isSidebarOpened ? (
						<li
							className={`sidebar__item${link.activeRoutes.includes(pathname) ? ' sidebar__item_active' : ''}`}
							key={link.href}
						>
							{link.href === 'logout' ? (
								<button
									className="sidebar__button sidebar__button_expanded"
									type="button"
									onClick={onLogOutClick}
								>
									<Icon />
									<span>{link.label}</span>
								</button>
							) : (
								<Link
									to={link.href}
									className={`sidebar__link${link.activeRoutes.includes(pathname) ? ' sidebar__link_active' : ''} sidebar__link_expanded`}
								>
									<Icon />
									<span>{link.label}</span>
								</Link>
							)}
						</li>
					) : (
						<Tooltip key={link.href} label={link.label} position="right">
							<li
								className={`sidebar__item${link.activeRoutes.includes(pathname) ? ' sidebar__item_active' : ''}`}
							>
								{link.href === 'logout' ? (
									<button className="sidebar__button" type="button" onClick={onLogOutClick}>
										<Icon />
									</button>
								) : (
									<Link
										to={link.href}
										className={`sidebar__link${link.activeRoutes.includes(pathname) ? ' sidebar__link_active' : ''} sidebar__link_expanded`}
									>
										<Icon />
									</Link>
								)}
							</li>
						</Tooltip>
					);
				})}
			</ul>
		</nav>
	);
};

export { SidebarView };
