import { SignUpFormView } from './sign-up-form-view';
import { PASSWORD_REQUIREMENTS, RED_COLOR, TEAL_COLOR, YELLOW_COLOR } from '../../constants.ts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { generateRandomPassword, getPasswordStrength } from '../../utils.ts';
import { useDictionariesOptions } from '../../../../api/hooks.ts';
import { useSignUpForm } from '../../hooks.ts';

const SignUpForm = () => {
	const [isPopoverOpened, setPopoverOpened] = useState(false);

	const passwordRef = useRef<HTMLInputElement>(null);

	const emailRef = useRef<HTMLInputElement>(null);

	const { dictionariesOptions } = useDictionariesOptions(['USER_SPECIALISATION']);

	const { handleNextStepClick, handlePrevStepClick, activeStep, formik } = useSignUpForm();

	useEffect(() => {
		if (emailRef?.current) {
			emailRef.current.focus();
		}
	}, []);

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		formik.setFieldError(name, '');
		formik.handleChange(e);
	};

	const handlePopoverOpened = (value: boolean) => {
		setPopoverOpened(value);
	};

	const handleGeneratePasswordClick = () => {
		const randomPassword = generateRandomPassword();

		formik.setValues({
			...formik.values,
			password: randomPassword,
			passwordRepeat: randomPassword,
		});

		if (passwordRef?.current) {
			passwordRef.current.focus();
		}
	};

	const handleSelectFieldChange = (name: string, value: string) => {
		formik.setFieldError(name, '');
		formik.setFieldValue(name, value);
	};

	const popoverData = useMemo(() => {
		const strength = getPasswordStrength(formik.values.password, PASSWORD_REQUIREMENTS);

		return {
			strength,
			color: strength === 100 ? TEAL_COLOR : strength > 50 ? YELLOW_COLOR : RED_COLOR,
		};
	}, [formik.values.password]);

	const isNextButtonDisabled = useMemo(() => {
		if (activeStep === 0) {
			return !(formik.values.email && formik.values.password && formik.values.passwordRepeat);
		}

		if (activeStep === 1) {
			return !(formik.values.name && formik.values.secondName && formik.values.userSpecialisationUuid);
		}

		return false;
	}, [
		activeStep,
		formik.values.email,
		formik.values.password,
		formik.values.passwordRepeat,
		formik.values.name,
		formik.values.secondName,
		formik.values.userSpecialisationUuid,
	]);

	return (
		<SignUpFormView
			activeStep={activeStep}
			formValues={formik.values}
			formErrors={formik.errors}
			isPopoverOpened={isPopoverOpened}
			popoverData={popoverData}
			passwordRef={passwordRef}
			emailRef={emailRef}
			isNextButtonDisabled={isNextButtonDisabled}
			stackOptions={dictionariesOptions?.userSpecialisation}
			onFieldChange={handleFieldChange}
			onPopoverOpened={handlePopoverOpened}
			onGeneratePasswordClick={handleGeneratePasswordClick}
			onSelectFieldChange={handleSelectFieldChange}
			onNextStepClick={handleNextStepClick}
			onPrevStepClick={handlePrevStepClick}
		/>
	);
};

export { SignUpForm };
