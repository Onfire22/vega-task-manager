import React, { type ReactNode } from 'react';
import type { IFilters, IOptionType, TFilter } from '../../types.ts';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Button } from '@/components/ui/button.tsx';

interface IProps {
	options: Array<IOptionType>;
	activeFilterColor?: string;
	filtersCount?: number;
	filters: IFilters;
	filter: TFilter;
	component: ReactNode;
	onCheckboxClick: (value: string) => void;
	onResetFilters: () => void;
}

const FiltersMenuView: React.FC<IProps> = ({
	options,
	onCheckboxClick,
	filters,
	filter,
	filtersCount,
	onResetFilters,
	component,
}) => {
	return (
		<CustomPopover
			width="200px"
			trigger={component}
			content={
				<div className="flex flex-col gap-2">
					<FieldGroup className="gap-3">
						{options.map((option) => {
							return (
								<Field key={option.value} orientation="horizontal">
									<Checkbox
										id={option.label}
										checked={Boolean(filters[filter][option.value])}
										onCheckedChange={() => onCheckboxClick(option.value)}
									/>
									<FieldLabel htmlFor={option.label} className="font-normal">
										{option.label}
									</FieldLabel>
								</Field>
							);
						})}
					</FieldGroup>
					<Button size="xs" disabled={filtersCount === 0} onClick={onResetFilters}>
						Сбросить
					</Button>
				</div>
			}
		/>
	);
};

export { FiltersMenuView };
