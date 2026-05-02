import { Undo2, ChevronLeft, ChevronRight, Briefcase, FolderKanban, Plus, X, Search } from 'lucide-react';
import React, { type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils.ts';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { Notifications } from '@/modules/notifications';

interface IProps {
	onSearchChange: (value: string) => void;
	onProfileCLick: () => void;
	onSearchClick: () => void;
	onGoBack: () => void;
	onEnterPress: (e: KeyboardEvent<HTMLInputElement>) => void;
	onMenuButtonClick: () => void;
	onModalOpen: (modal: 'task' | 'project') => void;
	searchValue: string;
	path: string;
	isSidebarOpened: boolean;
}

const BaseCustomMenuView: React.FC<IProps> = ({
	searchValue,
	onSearchChange,
	onModalOpen,
	onGoBack,
	path,
	onMenuButtonClick,
	isSidebarOpened,
	onSearchClick,
	onEnterPress,
}) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2.5">
				<div
					className={cn(
						'w-9 h-9 flex items-center justify-center cursor-pointer rounded-md transition-colors duration-300 ease-in hover:bg-accent',
						isSidebarOpened && 'bg-primary hover:bg-primary',
					)}
					onClick={onMenuButtonClick}
				>
					{isSidebarOpened ? <ChevronLeft /> : <ChevronRight />}
				</div>
				<div className="flex items-center gap-1.5">
					<CustomInput
						type="text"
						placeholder="Поиск..."
						value={searchValue}
						onKeyDown={onEnterPress}
						onChange={(e) => onSearchChange(e.target.value)}
						rightIcon={
							<X
								size={15}
								onClick={() => onSearchChange('')}
								style={{ display: searchValue ? undefined : 'none' }}
							/>
						}
					/>
					<Button
						variant="primary"
						size="lg"
						className="mt-1"
						disabled={!searchValue}
						onClick={onSearchClick}
					>
						<Search />
					</Button>
				</div>
			</div>
			<div className="flex items-center gap-2.5">
				<Notifications />
				<CustomPopover
					width="150px"
					trigger={
						<Button variant="primary">
							<Plus size={17} />
							Создать
						</Button>
					}
				>
					<ul className="flex flex-col gap-2.5">
						<li
							className="flex items-center gap-1.25 hover:bg-accent p-1.25 rounded-[5px] cursor-pointer"
							onClick={() => onModalOpen('project')}
						>
							<FolderKanban size={17} />
							<span>Проект</span>
						</li>
						<li
							className="flex items-center gap-1.25 hover:bg-accent p-1.25 rounded-[5px] cursor-pointer"
							onClick={() => onModalOpen('task')}
						>
							<Briefcase size={17} />
							<span>Задачу</span>
						</li>
					</ul>
				</CustomPopover>
				{path !== '/dashboard' && (
					<Button onClick={onGoBack}>
						<Undo2 size={18} />
					</Button>
				)}
			</div>
		</div>
	);
};

export { BaseCustomMenuView };
