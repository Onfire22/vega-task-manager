import { Undo2, ChevronLeft, ChevronRight, Briefcase, FolderKanban, Plus } from 'lucide-react';
import { Button, CloseButton, Input, Menu } from '@mantine/core';
import './styles.less';
import React from 'react';

interface IProps {
	onSearchChange: (value: string) => void;
	onProfileCLick: () => void;
	onGoBack: () => void;
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
}) => {
	return (
		<div className="base-custom-menu">
			<div className="base-custom-menu__info">
				<div
					className={`base-custom-menu__control${isSidebarOpened ? ' base-custom-menu__control_active' : ''}`}
					onClick={onMenuButtonClick}
				>
					{isSidebarOpened ? <ChevronLeft /> : <ChevronRight />}
				</div>
			</div>
			<div className="base-custom-menu__controls">
				<Input
					placeholder="Поиск..."
					rightSectionPointerEvents="all"
					value={searchValue}
					onChange={(e) => onSearchChange(e.target.value)}
					rightSection={
						<CloseButton
							aria-label="Clear input"
							onClick={() => onSearchChange('')}
							style={{ display: searchValue ? undefined : 'none' }}
						/>
					}
				/>
				<Menu width={180}>
					<Menu.Target>
						<Button variant="accent" leftSection={<Plus size={17} />}>
							Создать
						</Button>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>Задачу / проект</Menu.Label>
						<Menu.Item leftSection={<FolderKanban size={17} />} onClick={() => onModalOpen('project')}>
							Проект
						</Menu.Item>
						<Menu.Item leftSection={<Briefcase size={17} />} onClick={() => onModalOpen('task')}>
							Задачу
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
				{path !== '/dashboard' && (
					<Button className="base-custom-menu__button" leftSection={<Undo2 size={18} />} onClick={onGoBack} />
				)}
			</div>
		</div>
	);
};

export { BaseCustomMenuView };
