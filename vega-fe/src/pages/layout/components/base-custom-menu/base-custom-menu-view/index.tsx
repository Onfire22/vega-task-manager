import { IconArrowBack, IconClipboardCopy, IconPlus, IconSitemap } from '@tabler/icons-react';
import { Button, CloseButton, Input, Menu } from '@mantine/core';
import './styles.less';
import React from 'react';

interface IProps {
	onSearchChange: (value: string) => void;
	onProfileCLick: () => void;
	onGoBack: () => void;
	onModalOpen: (modal: 'task' | 'project') => void;
	searchValue: string;
	path: string;
	breadCrumbs: string;
}

const BaseCustomMenuView: React.FC<IProps> = ({
	searchValue,
	onSearchChange,
	onModalOpen,
	onGoBack,
	path,
	breadCrumbs,
}) => {
	return (
		<div className="base-custom-menu">
			<div className="base-custom-menu__info">
				<div className="base-custom-menu__logo">V</div>
				<div className="base-custom-menu__crumbs">{breadCrumbs}</div>
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
						<Button variant="accent" leftSection={<IconPlus size={17} />}>
							Создать
						</Button>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>Задачу / проект</Menu.Label>
						<Menu.Item leftSection={<IconSitemap size={20} />} onClick={() => onModalOpen('project')}>
							Проект
						</Menu.Item>
						<Menu.Item leftSection={<IconClipboardCopy size={20} />} onClick={() => onModalOpen('task')}>
							Задачу
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
				{path !== '/' && (
					<Button
						className="base-custom-menu__button"
						leftSection={<IconArrowBack size={18} />}
						onClick={onGoBack}
					/>
				)}
			</div>
		</div>
	);
};

export { BaseCustomMenuView };
