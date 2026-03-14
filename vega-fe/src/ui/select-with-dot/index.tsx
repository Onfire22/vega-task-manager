import { Group, Select, Text } from '@mantine/core';
import React from 'react';
import './styles.less';

interface ISelectOption {
	description: string;
	key: string;
	label: string;
	value: string;
}

interface IProps {
	options: Array<ISelectOption>;
	statuses: Array<Record<string, string>>;
	value: string;
}

const SelectWithDot: React.FC<IProps> = ({ options, value, statuses }) => {
	return (
		<Select
			data={options}
			value={value}
			className="select-with-dot"
			renderOption={({ option, checked }) => {
				const opt = option as ISelectOption;
				const status = statuses.find((status) => status.value === opt.key)!;
				return (
					<Group gap="sm" wrap="nowrap" className="select-with-dot__content">
						<div
							className="select-with-dot__dot"
							style={{
								background: status.color,
							}}
						/>
						<div className="select-with-dot__text">
							<Text size="sm" fw={checked ? 500 : 400}>
								{opt.label}
							</Text>
							<Text size="xs" c="dimmed">
								{opt.description}
							</Text>
						</div>
						{checked && (
							<Text size="xs" c="dimmed">
								✓
							</Text>
						)}
					</Group>
				);
			}}
		/>
	);
};

export { SelectWithDot };
