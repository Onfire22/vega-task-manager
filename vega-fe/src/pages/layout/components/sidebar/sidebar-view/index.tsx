import React from 'react';
import './styles.less';
import { BOTTOM_LINKS, TOP_LINKS } from '../../../contsants.ts';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mantine/core';

interface IProps {
	pathname: string;
	onLogOutClick: () => void;
}

const SidebarView: React.FC<IProps> = ({ pathname, onLogOutClick }) => {
	return (
		<nav className="sidebar">
			<ul className="sidebar__menu">
				{TOP_LINKS.map((link) => {
					const Icon = link.icon;
					return (
						<li
							className={`sidebar__item${pathname.includes(link.href) ? ' sidebar__item_active' : ''}`}
							key={link.href}
						>
							<Tooltip label={link.label} position="right">
								<Link
									to={link.href}
									className={`sidebar__link${pathname.includes(link.href) ? ' sidebar__link_active' : ''}`}
								>
									<Icon />
								</Link>
							</Tooltip>
						</li>
					);
				})}
			</ul>
			<ul className="sidebar__menu">
				{BOTTOM_LINKS.map((link) => {
					const Icon = link.icon;
					return (
						<li
							key={link.href}
							className={`sidebar__item${pathname.includes(link.href) ? ' sidebar__item_active' : ''}`}
						>
							<Tooltip label={link.label} position="right">
								{link.href === 'logout' ? (
									<button className="sidebar__button" type="button" onClick={onLogOutClick}>
										<Icon />
									</button>
								) : (
									<Link
										to={link.href}
										className={`sidebar__link${pathname.includes(link.href) ? ' sidebar__link_active' : ''}`}
									>
										<Icon />
									</Link>
								)}
							</Tooltip>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export { SidebarView };
