import { Badge } from '@mantine/core';
import React from 'react';

interface IProps {
	color: string;
	text: string;
}

const CustomBadge: React.FC<IProps> = ({ color, text }) => {
	return (
		<div className="custom-badge">
			<Badge fullWidth color={color}>
				{text}
			</Badge>
		</div>
	);
};

export { CustomBadge };
