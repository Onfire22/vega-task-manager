import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Ellipsis } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';
import type { IMappedUser } from '@/pages/chat/types.ts';
import { USER_COlORS } from '@/pages/chat/constants.ts';

interface IProps {
	isUsersControlsOpen: boolean;
	activeChannelUsers: Array<IMappedUser>;
}

const UsersControlsView: React.FC<IProps> = ({ isUsersControlsOpen, activeChannelUsers }) => {
	return (
		<div
			className={cn(
				'border-l transition-all duration-300 overflow-hidden',
				isUsersControlsOpen ? 'w-[23%] opacity-100' : 'w-0 opacity-0',
			)}
		>
			<div className="px-3 py-2 border-b">
				<CustomPopover trigger={<Button>+ Добавить участника</Button>}>123</CustomPopover>
			</div>
			<div className="px-1 py-1">
				<div className="text-muted-foreground text-[12px] uppercase mb-2 px-2 py-1">Онлайн - 3</div>
				<ul className="flex flex-col gap-2">
					{activeChannelUsers.map((user) => {
						return (
							<li
								key={user.uuid}
								className="flex items-start justify-between hover:bg-accent rounded-[5px] px-2 py-1"
							>
								<div>
									<div className="flex gap-2 items-start">
										<div
											className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white"
											style={{ background: user.avatar.color }}
										>
											{user.avatar.initials}
										</div>
										<div>
											<div className="text-[14px]">{user.name}</div>
											<div
												className="text-[12px] text-muted-foreground"
												style={{
													color: USER_COlORS[user.role.key as keyof typeof USER_COlORS],
												}}
											>
												{user.role.label}
											</div>
										</div>
									</div>
								</div>
								<CustomPopover width="200px" trigger={<Ellipsis size={17} />}>
									12
								</CustomPopover>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export { UsersControlsView };
