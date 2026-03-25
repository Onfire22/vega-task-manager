import React from 'react';
import { BOTTOM_LINKS, TOP_LINKS } from '../../../contsants.ts';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
import { CustomTooltip } from '@/components/common/custom-tooltip.tsx';

interface IProps {
	pathname: string;
	isSidebarOpened: boolean;
	onLogOutClick: () => void;
}

const SidebarView: React.FC<IProps> = ({ pathname, onLogOutClick, isSidebarOpened }) => {
	return (
		<nav
			className={cn(
				'h-[calc(100vh-53px)] w-13.5 flex flex-col justify-between border-r transition-[width] duration-300 ease-in-out',
				isSidebarOpened && 'w-75 transition-[width] duration-300 ease-in-out',
			)}
		>
			<ul className="p-1.25 flex flex-col gap-2.5">
				{TOP_LINKS.map((link) => {
					const Icon = link.icon;

					return isSidebarOpened ? (
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
								<Icon />
								<span>{link.label}</span>
							</Link>
						</li>
					) : (
						<CustomTooltip
							content={link.label}
							trigger={
								<li
									className={cn(
										'p-2.5 flex items-center rounded-[7px] transition-all duration-300 ease-in hover:bg-accent',
										link.activeRoutes.includes(pathname) &&
											'p-2.5 flex items-center rounded-[7px] bg-ring hover:bg-ring',
									)}
								>
									<Link
										to={link.href}
										className={cn(
											'h-6 text-foreground w-full flex items-center gap-2.5 no-underline',
										)}
									>
										<Icon />
									</Link>
								</li>
							}
							key={link.href}
							position="right"
						/>
					);
				})}
			</ul>
			<ul className="p-1.25 flex flex-col gap-2.5">
				{BOTTOM_LINKS.map((link) => {
					const Icon = link.icon;
					return isSidebarOpened ? (
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
									className="w-6 h-6 bg-transparent border-none cursor-pointer"
									type="button"
									onClick={onLogOutClick}
								>
									<Icon />
									<span>{link.label}</span>
								</button>
							) : (
								<Link
									to={link.href}
									className={cn('h-6 text-foreground w-full flex items-center gap-2.5 no-underline')}
								>
									<Icon />
									<span>{link.label}</span>
								</Link>
							)}
						</li>
					) : (
						<CustomTooltip
							key={link.href}
							content={link.label}
							position="right"
							trigger={
								<li
									className={cn(
										'p-2.5 flex items-center rounded-[7px] transition-all duration-300 ease-in hover:bg-accent',
										link.activeRoutes.includes(pathname) &&
											'p-2.5 flex items-center rounded-[7px] bg-ring hover:bg-ring',
									)}
								>
									{link.href === 'logout' ? (
										<button
											className="w-6 h-6 bg-transparent border-none cursor-pointer"
											type="button"
											onClick={onLogOutClick}
										>
											<Icon />
										</button>
									) : (
										<Link
											to={link.href}
											className="h-6 text-foreground w-full flex items-center gap-2.5 no-underline"
										>
											<Icon />
										</Link>
									)}
								</li>
							}
						/>
					);
				})}
			</ul>
		</nav>
	);
};

export { SidebarView };
