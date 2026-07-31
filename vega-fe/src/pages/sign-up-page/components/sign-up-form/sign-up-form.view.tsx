import React from 'react';
import { Link } from 'react-router-dom';
import { AccountStep } from './account-step.tsx';
import { CustomStepper } from '../stepper/stepper.tsx';
import { ProfileStep } from './profile-step.tsx';
import type { IFormValues, TSignUpFormValues } from '../../types.ts';
import { FRONT_ROUTES } from '@/app/constants.ts';
import type { UseFormReturn } from 'react-hook-form';

interface IProps {
	form: UseFormReturn<TSignUpFormValues>;
	activeStep: number;
	formValues: IFormValues;
	isPopoverOpened: boolean;
	isNextButtonDisabled: boolean;
	passwordRef: React.RefObject<HTMLInputElement | null>;
	emailRef: React.RefObject<HTMLInputElement | null>;
	popoverData: { strength: number; color: string };
	onPopoverOpened: (value: boolean) => void;
	onGeneratePasswordClick: () => void;
	onNextStepClick: () => void;
	onPrevStepClick: () => void;
}

const SignUpFormView: React.FC<IProps> = ({
	activeStep,
	formValues,
	isPopoverOpened,
	popoverData,
	onPopoverOpened,
	onGeneratePasswordClick,
	passwordRef,
	emailRef,
	isNextButtonDisabled,
	onPrevStepClick,
	onNextStepClick,
	form,
}) => {
	return (
		<div className="w-full h-screen flex-centered-line">
			<div className="w-125">
				<form className="w-full p-7.5 flex-centered-column gap-2.5 border border-border rounded-[5px]">
					<h1 className="text-2xl">Регистрация</h1>
					<div className="w-full">
						{activeStep === 0 && (
							<AccountStep
								form={form}
								formValues={formValues}
								isPopoverOpened={isPopoverOpened}
								passwordRef={passwordRef}
								emailRef={emailRef}
								onPopoverOpened={onPopoverOpened}
								onGeneratePasswordClick={onGeneratePasswordClick}
								popoverData={popoverData}
							/>
						)}
						{activeStep === 1 && <ProfileStep form={form} />}
					</div>
					<CustomStepper
						activeStep={activeStep}
						isNextButtonDisabled={isNextButtonDisabled}
						onPrevStepClick={onPrevStepClick}
						onNextStepClick={onNextStepClick}
					/>
					<div className="text-[14px] my-2.5">
						<span>Уже есть аккаунт? </span>
						<Link className="link-styled" to={FRONT_ROUTES.signIn}>
							Войти
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export { SignUpFormView };
