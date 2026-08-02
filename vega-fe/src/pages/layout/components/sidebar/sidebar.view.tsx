import React from 'react';
import { BOTTOM_LINKS, TOP_LINKS } from '../../contsants.ts';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
import type { ICurrentUser } from '@/pages/layout/types.ts';

interface IProps {
	pathname: string;
	isSidebarOpened: boolean;
	onLogOutClick: () => void;
	currentUser?: ICurrentUser;
}

const SidebarView: React.FC<IProps> = ({ pathname, onLogOutClick, isSidebarOpened, currentUser }) => {
	return (
		<nav
			className={cn(
				'h-[calc(100vh-55px)] w-13.5 flex flex-col justify-between border-r transition-[width] duration-300 ease-in-out',
				isSidebarOpened && 'w-75 transition-[width] duration-300 ease-in-out',
			)}
		>
			<ul className="p-1.25 flex flex-col gap-2.5">
				{TOP_LINKS.map((link) => {
					const Icon = link.icon;

					return (
						(currentUser?.[link.permission as keyof typeof currentUser] || !link.permission) && (
							<li
								className={cn(
									'p-2.5 flex items-center rounded-[7px] transition-all duration-300 ease-in hover:bg-accent',
									link.activeRoutes.includes(pathname) &&
										'p-2.5 flex items-center rounded-[7px] bg-ring hover:bg-ring',
								)}
								key={link.href}
							>
								<Link
									to={link.href}
									className={cn('h-6 text-foreground w-full flex items-center gap-2.5 no-underline')}
								>
									<Icon className="shrink-0" />
									<span
										className={cn(
											'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
											isSidebarOpened ? 'max-w-40 opacity-100' : 'max-w-0 opacity-0',
										)}
									>
										{link.label}
									</span>
								</Link>
							</li>
						)
					);
				})}
			</ul>
			<ul className="p-1.25 flex flex-col gap-2.5">
				{BOTTOM_LINKS.map((link) => {
					const Icon = link.icon;

					return (
						<li
							className={cn(
								'p-2.5 flex items-center rounded-[7px] transition-all duration-300 ease-in hover:bg-accent',
								link.activeRoutes.includes(pathname) &&
									'p-2.5 flex items-center rounded-[7px] bg-ring hover:bg-ring',
							)}
							key={link.href}
						>
							{link.href === 'logout' ? (
								<button
									className="h-6 text-foreground w-full flex items-center gap-2.5 cursor-pointer"
									type="button"
									onClick={onLogOutClick}
								>
									<Icon className="shrink-0" />
									<span
										className={cn(
											'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
											isSidebarOpened ? 'max-w-40 opacity-100' : 'max-w-0 opacity-0',
										)}
									>
										{link.label}
									</span>
								</button>
							) : (
								<Link
									to={link.href}
									className="h-6 text-foreground w-full flex items-center gap-2.5 no-underline"
								>
									<Icon className="shrink-0" />
									<span
										className={cn(
											'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
											isSidebarOpened ? 'max-w-40 opacity-100' : 'max-w-0 opacity-0',
										)}
									>
										{link.label}
									</span>
								</Link>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export { SidebarView };
