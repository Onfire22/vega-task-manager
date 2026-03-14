import { Group, Select, Text } from '@mantine/core';
import React from 'react';

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
					<Group gap="sm" wrap="nowrap" style={{ width: '100%' }}>
						<div
							className="select-with-dot__dot"
							style={{
								width: 8,
								height: 8,
								borderRadius: '50%',
								background: status.color,
								flexShrink: 0,
							}}
						/>
						<div style={{ flex: 1 }} className="select-with-dot__text">
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
