import React from 'react';
import Logo from '../../../../../assets/images/logo.png';
import LogOut from '../../../../../assets/icons/logout.svg?react';
import Settings from '../../../../../assets/icons/settings.svg?react';
import Profile from '../../../../../assets/icons/profile.svg?react';
import { Link } from 'react-router-dom';
import { CloseButton, Input, Menu } from '@mantine/core';
import { FRONT_ROUTES } from '../../../../../constants.ts';
import './styles.less';

interface IProps {
	onSearchChange: (value: string) => void;
	onProfileCLick: () => void;
	onLogOutClick: () => void;
	searchValue: string;
	userData: { name?: string; secondName?: string };
}

const CustomMenuView: React.FC<IProps> = ({ searchValue, onSearchChange, onProfileCLick, onLogOutClick, userData }) => {
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
				<Menu shadow="md" width={200}>
					<Menu.Target>
						<div className="custom-menu__profile">
							<Profile width={32} height={32} />
						</div>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>{`${userData.name} ${userData.secondName}`}</Menu.Label>
						<Menu.Item leftSection={<Settings width={20} height={20} />} onClick={onProfileCLick}>
							Профиль
						</Menu.Item>
						<Menu.Item leftSection={<LogOut width={20} height={20} />} onClick={onLogOutClick}>
							Выход
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</div>
		</div>
	);
};

export { CustomMenuView };
