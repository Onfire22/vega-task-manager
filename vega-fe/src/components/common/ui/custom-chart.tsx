import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart.tsx';
import { Pie, PieChart } from 'recharts';
import React from 'react';

interface IProps {
	data: Array<{ name: string; value: number; fill: string; custom?: string }>;
	config?: {
		[key: string]: { label: string };
	};
}

const CustomChart: React.FC<IProps> = ({ data, config = {} }) => {
	return (
		<ChartContainer config={config} className="h-35">
			<PieChart>
				<Pie data={data} innerRadius={45} outerRadius={60} dataKey="value" />
				<ChartTooltip content={<ChartTooltipContent />} />
			</PieChart>
		</ChartContainer>
	);
};

export { CustomChart };
