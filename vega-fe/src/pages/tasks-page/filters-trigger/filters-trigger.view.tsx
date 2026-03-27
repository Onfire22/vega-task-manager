import { Button } from '@/components/ui/button.tsx';
import React from 'react';

interface IProps {
	text: string;
	activeFilterColor: string;
	filtersCount: number;
}

const FiltersTriggerView: React.FC<IProps> = ({ text, filtersCount, activeFilterColor }) => {
	return (
		<Button>
			<span className="text-[11px] w-3.75 h-3.75 rounded-full" style={{ backgroundColor: activeFilterColor }}>
				{filtersCount}
			</span>
			<span>{text}</span>
		</Button>
	);
};

export { FiltersTriggerView };
