import { Badge } from '@mantine/core';
import React from 'react';
import { COLORS } from './constants.ts';

interface IProps {
	text: string;
	label: string;
	isFullWidth: boolean;
}

const CustomBadge: React.FC<IProps> = ({ label, text, isFullWidth }) => {
	const color = COLORS[label as keyof typeof COLORS];

	return (
		<Badge fullWidth={isFullWidth} color={color}>
			{text}
		</Badge>
	);
};

export { CustomBadge };
