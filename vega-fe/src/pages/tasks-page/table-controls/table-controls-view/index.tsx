import './styles.less';
import React from 'react';
import { Button, Skeleton, Switch, Tabs, Tooltip } from '@mantine/core';
import { BLUE_COLOR, TEAL_COLOR } from '../../constants.ts';
import { FiltersMenu } from '../../filters-menu';
import type { IDictionaries } from '../../types.ts';
import { IconArrowBackUp } from '@tabler/icons-react';

interface IProps {
	onTabClick: (value: string | null) => void;
	onSwitchClick: () => void;
	onResetAllFiltersClick: () => void;
	activeTab: string | null;
	isAssignee: boolean;
	isDictionariesLoading: boolean;
	isAllFiltersButton: boolean;
	dictionariesOptions: IDictionaries;
}

const TableControlsView: React.FC<IProps> = ({
	activeTab,
	onTabClick,
	onSwitchClick,
	isAssignee,
	dictionariesOptions,
	isDictionariesLoading,
	isAllFiltersButton,
	onResetAllFiltersClick,
}) => {
	return (
		<div className="tasks-controls">
			<div className="tasks-controls__tabs">
				<Tabs value={activeTab} onChange={onTabClick}>
					<Tabs.List>
						<Tabs.Tab value="table">Таблица</Tabs.Tab>
						<Tabs.Tab value="kanban">Канбан</Tabs.Tab>
					</Tabs.List>
				</Tabs>
			</div>
			<div className="tasks-controls__filters">
				<div className="tasks-controls__elements">
					{isDictionariesLoading ? (
						<Skeleton visible={isDictionariesLoading} />
					) : (
						<>
							<FiltersMenu
								component={Button}
								options={dictionariesOptions.taskPriority}
								placeholder="Приоритет"
								filter="taskPriorityUuid"
							/>
							<FiltersMenu
								component={Button}
								options={dictionariesOptions.taskStatus}
								placeholder="Статус"
								filter="taskStatusUuid"
							/>
							<FiltersMenu
								component={Button}
								options={dictionariesOptions.taskType}
								placeholder="Тег"
								filter="taskStackUuid"
							/>
							<Tooltip label="Сбросить фильтры">
								<Button size="xs" disabled={isAllFiltersButton} onClick={onResetAllFiltersClick}>
									<IconArrowBackUp size={15} />
								</Button>
							</Tooltip>
						</>
					)}
				</div>
				<div className="tasks-controls__switch">
					<span className={`table-controls__text${!isAssignee ? ' table-controls__text_active' : ''}`}>
						Мои задачи
					</span>
					<Switch
						className="tasks-controls__toggler"
						checked={isAssignee}
						onChange={onSwitchClick}
						styles={{
							track: {
								backgroundColor: isAssignee ? BLUE_COLOR : TEAL_COLOR,
							},
						}}
						style={{ '--before-color': isAssignee ? BLUE_COLOR : TEAL_COLOR }}
					/>
					<span className={`tasks-controls__text${isAssignee ? ' tasks-controls__text_active' : ''}`}>
						Я исполнитель
					</span>
				</div>
			</div>
		</div>
	);
};

export { TableControlsView };
