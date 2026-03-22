import React from 'react';
import { Button, Skeleton } from '@mantine/core';
import { TABS } from '../../constants.ts';
import { FiltersMenu } from '../../filters-menu';
import type { IDictionaries } from '../../types.ts';
import { IterationCw } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { CustomTabs } from '@/components/common/custom-tabs.tsx';
import { CustomSwitch } from '@/components/common/custom-switch.tsx';
import { CustomTooltip } from '@/components/common/custom-tooltip.tsx';

interface IProps {
	onTabClick: (value: string) => void;
	onSwitchClick: () => void;
	onResetAllFiltersClick: () => void;
	activeTab: string;
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
		<div className="relative mb-5">
			<div className="mb-2.5">
				<CustomTabs variant="line" triggers={TABS} defaultValue={activeTab} onChange={onTabClick} />
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1.25">
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
							<CustomTooltip
								content="Сбросить фильтры"
								position="top"
								trigger={
									<Button size="xs" disabled={isAllFiltersButton} onClick={onResetAllFiltersClick}>
										<IterationCw size={15} />
									</Button>
								}
							/>
						</>
					)}
				</div>
				<div className="flex items-center gap-2.5">
					<span className={cn(!isAssignee && 'font-semibold text-white')}>Мои задачи</span>
					<CustomSwitch checked={isAssignee} onChange={onSwitchClick} />
					<span className={cn(isAssignee && 'font-semibold text-white')}>Я исполнитель</span>
				</div>
			</div>
		</div>
	);
};

export { TableControlsView };
