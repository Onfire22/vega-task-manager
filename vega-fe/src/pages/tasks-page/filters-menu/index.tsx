import { FiltersMenuView } from './filters-menu-view';
import React from 'react';
import type { IOptionType } from '../types.ts';

interface IProps {
	options: Array<IOptionType>;
	placeholder: string;
	size?: string;
	component: React.ComponentType<{
		children: string;
		size: string;
	}>;
}

const FiltersMenu: React.FC<IProps> = ({ component, options, placeholder, size }) => {
	return <FiltersMenuView component={component} options={options} placeholder={placeholder} size={size} />;
};

export { FiltersMenu };
