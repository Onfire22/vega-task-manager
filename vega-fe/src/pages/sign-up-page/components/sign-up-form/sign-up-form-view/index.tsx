import React from 'react';
import { Link } from 'react-router-dom';
import { CustomForm } from '../../../../../components/custom-form';
import { AccountStep } from '../account-step';
import { Stepper } from '../../stepper';
import { ProfileStep } from '../profile-step';
import './styles.less';

interface IProps {
	activeStep: number;
	formValues: {
		email: string;
		password: string;
		passwordRepeat: string;
		name: string;
		secondName: string;
		stackUuid: string;
	};
	formErrors: {
		email?: string;
		password?: string;
		passwordRepeat?: string;
		name?: string;
		secondName?: string;
		stackUuid?: string;
	};
	isPopoverOpened: boolean;
	isNextButtonDisabled: boolean;
	stackOptions: Array<{ label: string; value: string }>;
	passwordRef: React.RefObject<HTMLInputElement | null>;
	emailRef: React.RefObject<HTMLInputElement | null>;
	popoverData: { strength: number; color: string };
	onSelectFieldChange: (name: string, value: string) => void;
	onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFormSubmit: () => void;
	onPopoverOpened: (value: boolean) => void;
	onGeneratePasswordClick: () => void;
	onEmailCheck: () => Promise<boolean>;
	onFormikValidate: () => Promise<boolean>;
}

const SignUpFormView: React.FC<IProps> = ({
	activeStep,
	formValues,
	formErrors,
	isPopoverOpened,
	popoverData,
	onFieldChange,
	onFormSubmit,
	onPopoverOpened,
	onGeneratePasswordClick,
	passwordRef,
	emailRef,
	isNextButtonDisabled,
	onEmailCheck,
	onFormikValidate,
	stackOptions,
	onSelectFieldChange,
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
					<Stepper
						isNextButtonDisabled={isNextButtonDisabled}
						onEmailCheck={onEmailCheck}
						onFormikValidate={onFormikValidate}
						onFormSubmit={onFormSubmit}
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
