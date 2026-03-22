import { Progress } from '@/components/ui/progress.tsx';
import { Field, FieldLabel } from '@/components/ui/field.tsx';
import React from 'react';

interface IProps {
	progress: number;
	percents?: string;
	label?: string;
	color?: string;
}

const CustomProgress: React.FC<IProps> = ({ progress, percents, label, color }) => {
	return (
		<Field className="min-w-full">
			<FieldLabel htmlFor="progress-upload">
				{label && <span className="text-[12px]">{label}</span>}
				{percents && <span className="ml-auto">{`${percents}%`}</span>}
			</FieldLabel>
			<Progress value={progress} id="progress-upload" indicatorClassName={color} />
		</Field>
	);
};

export { CustomProgress };
