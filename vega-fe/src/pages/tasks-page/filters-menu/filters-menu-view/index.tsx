import { Button, Checkbox, Menu } from '@mantine/core';
import React from 'react';
import type { IFilters, IOptionType, TFilter } from '../../types.ts';
import './styles.less';

interface IProps {
	options: Array<IOptionType>;
	placeholder: string;
	size?: string;
	activeFilterColor?: string;
	filtersCount?: number;
	filters: IFilters;
	filter: TFilter;
	component: React.ComponentType<{
		children: string;
		size: string;
		leftSection: React.ReactNode;
	}>;
	onCheckboxClick: (value: string) => void;
	onResetFilters: () => void;
}

const FiltersMenuView: React.FC<IProps> = ({
	options,
	placeholder,
	size = 'xs',
	onCheckboxClick,
	filters,
	filter,
	filtersCount,
	activeFilterColor,
	onResetFilters,
	component: Component,
}) => {
	return (
		<Menu width={200}>
			<Menu.Target>
				<Component
					leftSection={
						<div
							className="options-list__count"
							style={{ backgroundColor: activeFilterColor, color: activeFilterColor ? '#fff' : '' }}
						>
							{filtersCount}
						</div>
					}
					size={size}
				>
					{placeholder}
				</Component>
			</Menu.Target>
			<Menu.Dropdown>
				<div className="options-list">
					{options.map((option) => {
						return (
							<div className="options-list__item" key={option.value}>
								<Checkbox
									label={option.label}
									checked={Boolean(filters[filter][option.value])}
									onChange={() => onCheckboxClick(option.value)}
								/>
							</div>
						);
					})}
					<div className="options-list__reset">
						<Button size="xs" disabled={filtersCount === 0} onClick={onResetFilters}>
							Сбросить
						</Button>
					</div>
				</div>
			</Menu.Dropdown>
		</Menu>
	);
};

export { FiltersMenuView };
