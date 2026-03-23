import React from 'react';
import { Skeleton } from '@mantine/core';
import { TABS } from '../../constants.ts';
import { FiltersMenu } from '../../filters-menu';
import type { IDictionaries } from '../../types.ts';
import { IterationCw } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { CustomTabs } from '@/components/common/custom-tabs.tsx';
import { CustomSwitch } from '@/components/common/custom-switch.tsx';
import { CustomTooltip } from '@/components/common/custom-tooltip.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FiltersTrigger } from '../../filters-trigger/index.tsx';

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
				<CustomTabs variant="line" triggers={TABS} onChange={onTabClick} activeTab={activeTab} />
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1.25">
					{isDictionariesLoading ? (
						<Skeleton visible={isDictionariesLoading} />
					) : (
						<>
							<FiltersMenu
								component={<FiltersTrigger filter="taskPriorityUuid" text="Приоритет" />}
								options={dictionariesOptions.taskPriority}
								filter="taskPriorityUuid"
							/>
							<FiltersMenu
								component={<FiltersTrigger filter="taskStatusUuid" text="Статус" />}
								options={dictionariesOptions.taskStatus}
								filter="taskStatusUuid"
							/>
							<FiltersMenu
								component={<FiltersTrigger filter="taskStackUuid" text="Тег" />}
								options={dictionariesOptions.taskType}
								filter="taskStackUuid"
							/>
							<CustomTooltip
								content="Сбросить фильтры"
								position="top"
								trigger={
									<Button disabled={isAllFiltersButton} onClick={onResetAllFiltersClick}>
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
