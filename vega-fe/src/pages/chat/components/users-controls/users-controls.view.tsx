import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Ellipsis } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';

interface IProps {
	isUsersControlsOpen: boolean;
}

const UsersControlsView: React.FC<IProps> = ({ isUsersControlsOpen }) => {
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
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between hover:bg-accent rounded-[5px] px-2 py-1">
						<div>
							<div className="flex gap-2 items-start">
								<div className="w-[25px] h-[25px] bg-white rounded-full shrink-0" />
								<div>
									<div className="text-[14px]">Иванов Иван</div>
									<div className="text-[12px] text-muted-foreground">Администратор</div>
								</div>
							</div>
						</div>
						<CustomPopover width="200px" trigger={<Ellipsis size={17} />}>
							12
						</CustomPopover>
					</div>
					<div className="flex items-start justify-between hover:bg-accent rounded-[5px] px-2 py-1">
						<div>
							<div className="flex gap-2 items-start">
								<div className="w-[25px] h-[25px] bg-white rounded-full shrink-0" />
								<div>
									<div className="text-[14px]">Иванов Иван</div>
									<div className="text-[12px] text-muted-foreground">Администратор</div>
								</div>
							</div>
						</div>
						<CustomPopover width="200px" trigger={<Ellipsis size={17} />}>
							12
						</CustomPopover>
					</div>
					<div className="flex items-start justify-between hover:bg-accent rounded-[5px] px-2 py-1">
						<div>
							<div className="flex gap-2 items-start">
								<div className="w-[25px] h-[25px] bg-white rounded-full shrink-0" />
								<div>
									<div className="text-[14px]">Иванов Иван</div>
									<div className="text-[12px] text-muted-foreground">Администратор</div>
								</div>
							</div>
						</div>
						<CustomPopover width="200px" trigger={<Ellipsis size={17} />}>
							12
						</CustomPopover>
					</div>
				</div>
			</div>
		</div>
	);
};

export { UsersControlsView };
