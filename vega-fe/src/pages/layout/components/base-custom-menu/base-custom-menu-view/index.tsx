import Logo from '../../../../../assets/images/logo.png';
import { IconArrowBackUp, IconClipboardCopy, IconPlus, IconSitemap } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Burger, Button, CloseButton, Input, Menu } from '@mantine/core';
import './styles.less';
import React from 'react';
import { FRONT_ROUTES } from '../../../../../constants.ts';

interface IProps {
	onSearchChange: (value: string) => void;
	onProfileCLick: () => void;
	onBurgerClick: () => void;
	onGoBack: () => void;
	onModalOpen: (modal: 'task' | 'project') => void;
	searchValue: string;
	path: string;
	isSidebarOpened: boolean;
}

const BaseCustomMenuView: React.FC<IProps> = ({
	searchValue,
	onSearchChange,
	onBurgerClick,
	onModalOpen,
	isSidebarOpened,
	onGoBack,
	path,
}) => {
	return (
		<div className="base-custom-menu">
			<div className="base-custom-menu__info">
				<Burger lineSize={2} opened={isSidebarOpened} onClick={onBurgerClick} />
				<Link className="base-custom-menu__logo" to={FRONT_ROUTES.root}>
					<img className="base-custom-menu__image" src={Logo} />
				</Link>
				<div className="base-custom-menu__crumbs">Core / Tasks</div>
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
				<Menu shadow="md" width={180}>
					<Menu.Target>
						<Button rightSection={<IconPlus size={17} />}>Создать</Button>
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
					<Button className="base-custom-menu__button" leftSection={<IconArrowBackUp />} onClick={onGoBack} />
				)}
			</div>
		</div>
	);
};

export { BaseCustomMenuView };
