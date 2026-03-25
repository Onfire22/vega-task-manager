import { Group, Select, Text } from '@mantine/core';
import React from 'react';
import './styles.less';

interface ISelectOption {
	description: string;
	key: string;
	label: string;
	value: string;
}

interface IValue {
	id: string;
	key: string;
	label: string;
}

interface IProps {
	options: Array<ISelectOption>;
	statuses: Array<Record<string, string>>;
	value: IValue;
	size?: string;
	label?: string;
	leftSection?: string;
	onChange: (value: string | null) => void;
}

const CustomSelect: React.FC<IProps> = ({ options, value, statuses, label, onChange, size = 'sm' }) => {
	const activeColor = statuses.find((status) => status.value === value.key)?.color;
	return (
		<div className="custom-select">
			{label && <label className="custom-select__label">{label}</label>}
			<Select
				data={options}
				value={value.id}
				size={size}
				styles={{
					section: {
						justifyContent: 'left',
						paddingLeft: '3px',
					},
					input: {
						backgroundColor: activeColor + '53',
						borderColor: activeColor,
					},
				}}
				className="custom-select__select"
				renderOption={({ option, checked }) => {
					const opt = option as ISelectOption;
					const status = statuses.find((status) => status.value === opt.key)!;
					return (
						<Group gap="sm" wrap="nowrap" className="custom-select__content">
							<div
								className="custom-select__dot"
								style={{
									background: status.color,
								}}
							/>
							<div className="custom-select__text">
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
				onChange={onChange}
			/>
		</div>
	);
};

export { CustomSelect };
