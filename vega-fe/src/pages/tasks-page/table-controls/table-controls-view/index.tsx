import './styles.less';
import type { TActiveTab } from '../../types.ts';
import React from 'react';
import { Switch } from '@mantine/core';
import { BLUE_COLOR, TEAL_COLOR } from '../../constants.ts';

interface IProps {
	onTabClick: (tab: TActiveTab) => void;
	onSwitchClick: () => void;
	activeTab: TActiveTab;
	switchStatus: boolean;
}

const TableControlsView: React.FC<IProps> = ({ activeTab, onTabClick, switchStatus, onSwitchClick }) => {
	return (
		<section className="table-controls">
			<div className="table-controls__tabs">
				<button
					className={`table-controls__tab${activeTab === 'table' ? ' table-controls__tab_active' : ''}`}
					onClick={() => onTabClick('table')}
				>
					Таблица
				</button>
				<button
					className={`table-controls__tab${activeTab === 'kanban' ? ' table-controls__tab_active' : ''}`}
					onClick={() => onTabClick('kanban')}
				>
					Kanban
				</button>
			</div>
			<div className="table-controls__switch">
				<span>Я исполнитель</span>
				<Switch
					className="table-controls__toggler"
					checked={switchStatus}
					onChange={onSwitchClick}
					styles={{
						track: {
							backgroundColor: switchStatus ? BLUE_COLOR : TEAL_COLOR,
						},
					}}
					style={{ '--before-color': switchStatus ? BLUE_COLOR : TEAL_COLOR }}
				/>
				<span>Мои задачи</span>
			</div>
		</section>
	);
};

export { TableControlsView };
