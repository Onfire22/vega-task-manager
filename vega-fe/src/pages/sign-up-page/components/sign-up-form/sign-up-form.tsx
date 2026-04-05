import { SignUpFormView } from './sign-up-form.view.tsx';
import { PASSWORD_REQUIREMENTS, RED_COLOR, TEAL_COLOR, YELLOW_COLOR } from '../../constants.ts';
import { useEffect, useMemo, useRef, useState } from 'react';
import { generateRandomPassword, getPasswordStrength } from '../../utils.ts';
import { useDictionariesOptions } from '@/api/dictionaries/dictionaries.hooks.ts';
import { useSignUpForm } from '../../hooks.ts';

const SignUpForm = () => {
	const [isPopoverOpened, setPopoverOpened] = useState(false);

	const passwordRef = useRef<HTMLInputElement>(null);

	const emailRef = useRef<HTMLInputElement>(null);

	const { dictionariesOptions } = useDictionariesOptions(['USER_SPECIALISATION']);

	const { handleNextStepClick, handlePrevStepClick, activeStep, form, formValues } = useSignUpForm();

	useEffect(() => {
		if (emailRef?.current) {
			emailRef.current.focus();
		}
	}, []);

	const handlePopoverOpened = (value: boolean) => {
		setPopoverOpened(value);
	};

	const handleGeneratePasswordClick = () => {
		const randomPassword = generateRandomPassword();

		form.reset({
			...formValues,
			password: randomPassword,
			passwordRepeat: randomPassword,
		});

		if (passwordRef?.current) {
			passwordRef.current.focus();
		}
	};

	const popoverData = useMemo(() => {
		const strength = getPasswordStrength(formValues.password, PASSWORD_REQUIREMENTS);

		return {
			strength,
			color: strength === 100 ? TEAL_COLOR : strength > 50 ? YELLOW_COLOR : RED_COLOR,
		};
	}, [formValues.password]);

	const isNextButtonDisabled = useMemo(() => {
		if (activeStep === 0) {
			return !(formValues.email && formValues.password && formValues.passwordRepeat);
		}

		if (activeStep === 1) {
			return !(formValues.name && formValues.secondName && formValues.userSpecialisationUuid);
		}

		return false;
	}, [
		activeStep,
		formValues.email,
		formValues.password,
		formValues.passwordRepeat,
		formValues.name,
		formValues.secondName,
		formValues.userSpecialisationUuid,
	]);

	return (
		<SignUpFormView
			form={form}
			formValues={formValues}
			activeStep={activeStep}
			isPopoverOpened={isPopoverOpened}
			popoverData={popoverData}
			passwordRef={passwordRef}
			emailRef={emailRef}
			isNextButtonDisabled={isNextButtonDisabled}
			stackOptions={dictionariesOptions?.userSpecialisation}
			onPopoverOpened={handlePopoverOpened}
			onGeneratePasswordClick={handleGeneratePasswordClick}
			onNextStepClick={handleNextStepClick}
			onPrevStepClick={handlePrevStepClick}
		/>
	);
};

export { SignUpForm };
