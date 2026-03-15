import { Checkbox, Menu } from '@mantine/core';
import React from 'react';
import type { IOptionType } from '../../types.ts';
import './styles.less';

interface IProps {
	options: Array<IOptionType>;
	placeholder: string;
	size?: string;
	component: React.ComponentType<{
		children: string;
		size: string;
	}>;
}

const FiltersMenuView: React.FC<IProps> = ({ options, placeholder, size = 'xs', component: Component }) => {
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
								<Checkbox label={option.label} value={option.value} />
							</div>
						);
					})}
				</div>
			</Menu.Dropdown>
		</Menu>
	);
};

export { FiltersMenuView };
