import { Checkbox, Menu } from '@mantine/core';
import React from 'react';
import type { IFilters, IOptionType, TFilter } from '../../types.ts';
import './styles.less';

interface IProps {
	options: Array<IOptionType>;
	placeholder: string;
	size?: string;
	filters: IFilters;
	filter: TFilter;
	component: React.ComponentType<{
		children: string;
		size: string;
	}>;
	onCheckboxClick: (value: string) => void;
}

const FiltersMenuView: React.FC<IProps> = ({
	options,
	placeholder,
	size = 'xs',
	onCheckboxClick,
	filters,
	filter,
	component: Component,
}) => {
	return (
		<Menu width={200}>
			<Menu.Target>
				<Component size={size}>{placeholder}</Component>
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
				</div>
			</Menu.Dropdown>
		</Menu>
	);
};

export { FiltersMenuView };
