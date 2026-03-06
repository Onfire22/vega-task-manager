import React from 'react';
import { Link } from 'react-router-dom';
import { CustomForm } from '../../../../../components/custom-form';
import { AccountStep } from '../account-step';
import { CustomStepper } from '../../stepper';
import { ProfileStep } from '../profile-step';
import './styles.less';
import type { IFormErrors, IFormValues, IOptions } from '../../../types.ts';

interface IProps {
	activeStep: number;
	formValues: IFormValues;
	formErrors: IFormErrors;
	isPopoverOpened: boolean;
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
}) => {
	return (
		<div className="signup-form">
			<div className="signup-form__wrapper">
				<CustomForm title="Регистрация">
					<div className="signup-form__step">
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
					<div className="signup-form__text">
						<span>Уже есть аккаунт? </span>
						<Link className="signup-form__link" to="/sign-in">
							Войти
						</Link>
					</div>
				</CustomForm>
			</div>
		</div>
	);
};

export { SignUpFormView };
