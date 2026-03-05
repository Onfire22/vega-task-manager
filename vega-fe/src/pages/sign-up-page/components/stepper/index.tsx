import { StepperView } from './stepper-view';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { getActiveStepSelector } from '../../selectors.ts';
import { setActiveStep } from '../../slice.ts';
import React from 'react';

interface IProps {
	isNextButtonDisabled: boolean;
	onEmailCheck: () => Promise<boolean>;
	onFormikValidate: () => Promise<boolean>;
	onFormSubmit: () => void;
}

const Stepper: React.FC<IProps> = ({ isNextButtonDisabled, onEmailCheck, onFormikValidate, onFormSubmit }) => {
	const dispatch = useAppDispatch();
	const activeStep = useAppSelector(getActiveStepSelector());

	const handleNextStepClick = async () => {
		if (activeStep === 0) {
			const isEmailFree = await onEmailCheck();

			if (!isEmailFree) return;
		}

		const isFormValid = await onFormikValidate();

		if (!isFormValid) return;

		if (activeStep === 1) {
			onFormSubmit();
		}

		dispatch(setActiveStep(activeStep < 2 ? activeStep + 1 : activeStep));
	};

	const handlePrevStepClick = () => {
		dispatch(setActiveStep(activeStep > 0 ? activeStep - 1 : activeStep));
	};

	return (
		<StepperView
			activeStep={activeStep}
			isNextButtonDisabled={isNextButtonDisabled}
			onPrevStepClick={handlePrevStepClick}
			onNextStepClick={handleNextStepClick}
		/>
	);
};

export { Stepper };
