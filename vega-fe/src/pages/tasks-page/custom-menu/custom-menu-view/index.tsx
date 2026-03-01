import Logo from '../../../../assets/images/logo.png';
import {
	IconClipboardCopy,
	IconLogout2,
	IconPlus,
	IconSettings,
	IconSitemap,
	IconUserCircle,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { FRONT_ROUTES } from '../../../../constants.ts';
import { Button, CloseButton, Input, Menu } from '@mantine/core';
import './styles.less';
import React from 'react';

interface IProps {
	onSearchChange: (value: string) => void;
	onProfileCLick: () => void;
	onLogOutClick: () => void;
	onModalOpen: (modal: 'task' | 'project') => void;
	searchValue: string;
	userData: { name?: string; secondName?: string };
}

const CustomMenuView: React.FC<IProps> = ({
	searchValue,
	onSearchChange,
	onProfileCLick,
	onLogOutClick,
	onModalOpen,
	userData,
}) => {
	return (
		<div className="custom-menu">
			<div className="custom-menu__info">
				<Link className="custom-menu__logo" to={FRONT_ROUTES.root}>
					<img className="custom-menu__image" src={Logo} />
				</Link>
				<div className="custom-menu__crumbs">Core / Tasks</div>
			</div>
			<div className="custom-menu__controls">
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
				<Menu shadow="md" width={200}>
					<Menu.Target>
						<div className="custom-menu__profile">
							<IconUserCircle size={32} color="#2BABA4" />
						</div>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>{`${userData.name} ${userData.secondName}`}</Menu.Label>
						<Menu.Item leftSection={<IconSettings size={20} />} onClick={onProfileCLick}>
							Профиль
						</Menu.Item>
						<Menu.Item leftSection={<IconLogout2 size={20} />} onClick={onLogOutClick}>
							Выход
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</div>
		</div>
	);
};

export { CustomMenuView };
