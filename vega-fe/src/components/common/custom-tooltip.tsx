import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import React, { type ReactNode } from 'react';

interface IProps {
	trigger: ReactNode;
	content: string;
	position: 'left' | 'top' | 'bottom' | 'right';
}

const CustomTooltip: React.FC<IProps> = ({ trigger, content, position }) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>{trigger}</TooltipTrigger>
			<TooltipContent className="bg-card" side={position}>
				{content}
			</TooltipContent>
		</Tooltip>
	);
};

export { CustomTooltip };
