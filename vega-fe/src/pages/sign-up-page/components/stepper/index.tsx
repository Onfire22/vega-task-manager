import React from 'react';
import { Button, Group, Stepper } from '@mantine/core';
import { MoveLeft, MoveRight } from 'lucide-react';
import './styles.less';

interface IProps {
	activeStep: number;
	isNextButtonDisabled: boolean;
	onPrevStepClick: () => void;
	onNextStepClick: () => void;
}

const CustomStepper: React.FC<IProps> = ({ activeStep, onPrevStepClick, onNextStepClick, isNextButtonDisabled }) => {
	return (
		<div className="custom-stepper">
			<Stepper active={activeStep}>
				<Stepper.Step label="Первый шаг" description="Регистрация" />
				<Stepper.Step label="Второй шаг" description="Инфо о себе" />
			</Stepper>
			<Group justify="center" mt="xl">
				{activeStep > 0 && (
					<Button className="custom-stepper__button" variant="default" onClick={onPrevStepClick}>
						<MoveLeft />
					</Button>
				)}
				<Button
					className="custom-stepper__button"
					type="button"
					disabled={isNextButtonDisabled}
					onClick={onNextStepClick}
				>
					<MoveRight />
				</Button>
			</Group>
		</div>
	);
};

export { CustomStepper };
