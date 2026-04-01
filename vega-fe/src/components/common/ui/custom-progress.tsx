import { Progress } from '@/components/ui/progress.tsx';
import { Field, FieldLabel } from '@/components/ui/field.tsx';
import React from 'react';
import { cn } from '@/lib/utils.ts';

interface IProps {
	progress: number;
	percents?: string;
	label?: string;
	color?: string;
	size?: 'h-1' | 'h-2' | 'h-3';
}

const CustomProgress: React.FC<IProps> = ({ progress, percents, label, color, size }) => {
	return (
		<Field className="min-w-full">
			<FieldLabel htmlFor="progress-upload">
				{label && <span className="text-[12px]">{label}</span>}
				{percents && <span className="ml-auto text-[12px]">{`${percents}`}</span>}
			</FieldLabel>
			<Progress
				className={cn(size ? size : 'h-1')}
				value={progress}
				id="progress-upload"
				indicatorClassName={color}
			/>
		</Field>
	);
};

export { CustomProgress };
