import React from 'react';
import { PRIORITIES_MAP } from './constants.ts';
import './styles.less';

interface IProps {
	data: { name: string; color?: string | null };
	size: number;
}

const CustomStatus: React.FC<IProps> = ({ data, size }) => {
	const Icon = PRIORITIES_MAP[data.name as keyof typeof PRIORITIES_MAP];

	return (
		<div className="custom-status">
			<span>{data.name}</span>
			<Icon color={data.color || '#fff'} size={size} />
		</div>
	);
};

export { CustomStatus };
