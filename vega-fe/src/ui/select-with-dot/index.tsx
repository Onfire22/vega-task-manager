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
	leftSection?: string;
	onChange: (value: string | null) => void;
}

const SelectWithDot: React.FC<IProps> = ({ options, value, statuses, leftSection, onChange, size = 'sm' }) => {
	const activeColor = statuses.find((status) => status.value === value.key)?.color;
	return (
		<Select
			data={options}
			value={value.id}
			size={size}
			leftSectionWidth={leftSection ? leftSection.length * 6 + 14 : undefined}
			styles={{
				section: {
					justifyContent: 'left',
					paddingLeft: '3px',
				},
				input: {
					backgroundColor: activeColor + '33',
					borderColor: activeColor,
					color: activeColor,
				},
			}}
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
			{...(leftSection
				? { leftSection: <div className="select-with-dot__left-section">{leftSection}</div> }
				: {})}
			onChange={onChange}
		/>
	);
};

export { SelectWithDot };
