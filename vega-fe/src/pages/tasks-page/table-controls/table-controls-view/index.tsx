import React from 'react';
import { TABS } from '../../constants.ts';
import { FiltersMenu } from '../../filters-menu';
import type { IDictionaries } from '../../types.ts';
import { IterationCw } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { CustomTabs } from '@/components/common/ui/custom-tabs.tsx';
import { CustomTooltip } from '@/components/common/ui/custom-tooltip.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { Switch } from '@/components/ui/switch.tsx';

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
						<CustomLoader />
					) : (
						<>
							<FiltersMenu
								options={dictionariesOptions.taskPriority}
								filter="taskPriorityUuid"
								text="Приоритет"
							/>
							<FiltersMenu
								options={dictionariesOptions.taskStatus}
								filter="taskStatusUuid"
								text="Статус"
							/>
							<FiltersMenu options={dictionariesOptions.taskType} filter="taskStackUuid" text="Тег" />
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
					<Switch
						className="data-[state=checked]:bg-teal data-[state=unchecked]:bg-violet cursor-pointer"
						checked={isAssignee}
						onCheckedChange={onSwitchClick}
					/>
					<span className={cn(isAssignee && 'font-semibold text-white')}>Я исполнитель</span>
				</div>
			</div>
		</div>
	);
};

export { TableControlsView };
