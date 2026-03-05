import React from 'react';
import { Button, Group, Stepper } from '@mantine/core';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import './styles.less';

interface IProps {
	activeStep: number;
	isNextButtonDisabled: boolean;
	onPrevStepClick: () => void;
	onNextStepClick: () => void;
}

const StepperView: React.FC<IProps> = ({ activeStep, onPrevStepClick, onNextStepClick, isNextButtonDisabled }) => {
	return (
		<div className="stepper">
			<Stepper active={activeStep}>
				<Stepper.Step label="Первый шаг" description="Регистрация" />
				<Stepper.Step label="Второй шаг" description="Инфо о себе" />
			</Stepper>
			<Group justify="center" mt="xl">
				{activeStep > 0 && (
					<Button className="stepper__button" variant="default" onClick={onPrevStepClick}>
						<IconArrowNarrowLeft />
					</Button>
				)}
				<Button
					className="stepper__button"
					type="button"
					disabled={isNextButtonDisabled}
					onClick={onNextStepClick}
				>
					<IconArrowNarrowRight />
				</Button>
			</Group>
		</div>
	);
};

export { StepperView };
