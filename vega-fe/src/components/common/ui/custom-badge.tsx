import React from 'react';
import { Badge } from '@/components/ui/badge.tsx';

const COLORS = {
	medium: 'amber',
	low: 'teal',
	high: 'danger',
	highest: 'red',

	todo: 'blue',
	in_progress: 'blue',
	testing: 'amber',
	done: 'teal',
	stopped: 'danger',

	fe: 'blue',
	be: 'teal',
	fs: 'violet',
	qa: 'amber',
	an: 'danger',

	p_backlog: 'default',
	p_in_progress: 'amber',
	p_closed: 'teal',
	p_stopped: 'danger',
} as const;

interface IProps {
	text: string;
	label: string;
}

const CustomBadge: React.FC<IProps> = ({ label, text }) => {
	const variant = COLORS[label as keyof typeof COLORS];

	return (
		<Badge className="w-full" variant={variant}>
			{text}
		</Badge>
	);
};

export { CustomBadge };
