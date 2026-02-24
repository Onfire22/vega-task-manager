import './styles.less';
import type { TActiveTab } from '../../types.ts';
import React from 'react';
import { Switch } from '@mantine/core';
import { BLUE_COLOR, TEAL_COLOR } from '../../constants.ts';

interface IProps {
	onTabClick: (tab: TActiveTab) => void;
	onSwitchClick: () => void;
	activeTab: TActiveTab;
	isAssignee: boolean;
}

const TableControlsView: React.FC<IProps> = ({ activeTab, onTabClick, onSwitchClick, isAssignee }) => {
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
				<span className={`table-controls__text${!isAssignee ? ' table-controls__text_active' : ''}`}>
					Я исполнитель
				</span>
				<Switch
					className="table-controls__toggler"
					checked={isAssignee}
					onChange={onSwitchClick}
					styles={{
						track: {
							backgroundColor: isAssignee ? BLUE_COLOR : TEAL_COLOR,
						},
					}}
					style={{ '--before-color': isAssignee ? BLUE_COLOR : TEAL_COLOR }}
				/>
				<span className={`table-controls__text${isAssignee ? ' table-controls__text_active' : ''}`}>
					Мои задачи
				</span>
			</div>
		</section>
	);
};

export { TableControlsView };
