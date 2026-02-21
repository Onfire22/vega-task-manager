import { SignUpFormView } from './sign-up-form-view';
import { useFormik } from 'formik';
import { PASSWORD_REQUIREMENTS, RED_COLOR, SIGNUP_DEFAULT_VALUES, TEAL_COLOR, YELLOW_COLOR } from '../../constants.ts';
import { SignUpValidationSchema } from '../../validation.ts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSignUpUserMutation } from '../../../../api/auth/api.ts';
import { generateRandomPassword, getPasswordStrength } from '../../utils.ts';

const SignUpForm = () => {
	const passwordRef = useRef<HTMLInputElement>(null);

	const emailRef = useRef<HTMLInputElement>(null);

	const [isPopoverOpened, setPopoverOpened] = useState(false);

	const [signUpUser] = useSignUpUserMutation();

	useEffect(() => {
		if (emailRef?.current) {
			emailRef.current.focus();
		}
	}, []);

	const formik = useFormik({
		initialValues: SIGNUP_DEFAULT_VALUES,
		validationSchema: SignUpValidationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			try {
				const response = await signUpUser(values);
				console.log(response);
			} catch (e) {
				console.log(e);
			}
			console.log(values);
		},
	});

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

	const popoverData = useMemo(() => {
		const strength = getPasswordStrength(formik.values.password, PASSWORD_REQUIREMENTS);

		return {
			strength,
			color: strength === 100 ? TEAL_COLOR : strength > 50 ? YELLOW_COLOR : RED_COLOR,
		};
	}, [formik.values.password]);

	return (
		<SignUpFormView
			formValues={formik.values}
			formErrors={formik.errors}
			isPopoverOpened={isPopoverOpened}
			popoverData={popoverData}
			passwordRef={passwordRef}
			emailRef={emailRef}
			onFieldChange={handleFieldChange}
			onFormSubmit={formik.handleSubmit}
			onPopoverOpened={handlePopoverOpened}
			onGeneratePasswordClick={handleGeneratePasswordClick}
		/>
	);
};

export { SignUpForm };
