import { Badge } from '@mantine/core';
import React from 'react';

interface IProps {
	color?: string | null;
	text: string;
}

const CustomBadge: React.FC<IProps> = ({ color, text }) => {
	return (
		<div className="custom-badge">
			<Badge fullWidth color={color || '#fff'}>
				{text}
			</Badge>
		</div>
	);
};

export { CustomBadge };
