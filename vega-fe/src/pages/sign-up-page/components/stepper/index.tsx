import React from 'react';
import { MoveLeft, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

interface IProps {
	activeStep: number;
	isNextButtonDisabled: boolean;
	onPrevStepClick: () => void;
	onNextStepClick: () => void;
}

const CustomStepper: React.FC<IProps> = ({ activeStep, onPrevStepClick, onNextStepClick, isNextButtonDisabled }) => {
	return (
		<div>
			{activeStep > 0 && (
				<Button className="w-12.5 h-12.5 rounded-full" variant="primary" onClick={onPrevStepClick}>
					<MoveLeft />
				</Button>
			)}
			<Button
				className="w-12.5 h-12.5 rounded-full"
				variant="primary"
				type="button"
				disabled={isNextButtonDisabled}
				onClick={onNextStepClick}
			>
				<MoveRight />
			</Button>
		</div>
	);
};

export { CustomStepper };
