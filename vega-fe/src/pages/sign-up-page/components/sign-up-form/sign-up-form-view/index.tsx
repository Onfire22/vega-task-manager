import React from 'react';
import { Link } from 'react-router-dom';
import { CustomForm } from '../../../../../components/common/custom-form.tsx';
import { AccountStep } from '../account-step';
import { CustomStepper } from '../../stepper';
import { ProfileStep } from '../profile-step';
import type { IFormErrors, IFormValues, IOptions } from '../../../types.ts';
import { FRONT_ROUTES } from '@/app/constants.ts';

interface IProps {
	activeStep: number;
	formValues: IFormValues;
	formErrors: IFormErrors;
	isPopoverOpened: boolean;
	isError: boolean;
	isNextButtonDisabled: boolean;
	stackOptions: Array<IOptions>;
	passwordRef: React.RefObject<HTMLInputElement | null>;
	emailRef: React.RefObject<HTMLInputElement | null>;
	popoverData: { strength: number; color: string };
	onSelectFieldChange: (name: string, value: string) => void;
	onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onPopoverOpened: (value: boolean) => void;
	onGeneratePasswordClick: () => void;
	onNextStepClick: () => void;
	onPrevStepClick: () => void;
}

const SignUpFormView: React.FC<IProps> = ({
	activeStep,
	formValues,
	formErrors,
	isPopoverOpened,
	popoverData,
	onFieldChange,
	onPopoverOpened,
	onGeneratePasswordClick,
	passwordRef,
	emailRef,
	isNextButtonDisabled,
	stackOptions,
	onSelectFieldChange,
	onPrevStepClick,
	onNextStepClick,
	isError,
}) => {
	console.log(isError);
	return (
		<div className="w-full h-screen flex-centered-line">
			<div className="w-125">
				<CustomForm title="Регистрация">
					<div className="w-full">
						{activeStep === 0 && (
							<AccountStep
								formValues={formValues}
								formErrors={formErrors}
								isPopoverOpened={isPopoverOpened}
								passwordRef={passwordRef}
								emailRef={emailRef}
								onPopoverOpened={onPopoverOpened}
								onGeneratePasswordClick={onGeneratePasswordClick}
								popoverData={popoverData}
								onFieldChange={onFieldChange}
							/>
						)}
						{activeStep === 1 && (
							<ProfileStep
								formValues={formValues}
								formErrors={formErrors}
								onFieldChange={onFieldChange}
								stackOptions={stackOptions}
								onSelectFieldChange={onSelectFieldChange}
							/>
						)}
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
				</CustomForm>
			</div>
		</div>
	);
};

export { SignUpFormView };
