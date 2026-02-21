import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { SignInFormView } from './sing-in-form-view';
import { SIGN_IN_DEFAULT_VALUES } from '../constants.ts';
import { SignUpValidationSchema } from '../validation.ts';

const SignUpForm = () => {
	const loginRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (loginRef?.current) {
			loginRef.current.focus();
		}
	}, []);

	const formik = useFormik({
		initialValues: SIGN_IN_DEFAULT_VALUES,
		validationSchema: SignUpValidationSchema,
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		formik.setFieldError(name, '');
		formik.handleChange(e);
	};

	return (
		<SignInFormView
			formValues={formik.values}
			formErrors={formik.errors}
			loginRef={loginRef}
			onFieldChange={handleFieldChange}
			onFormSubmit={formik.handleSubmit}
		/>
	);
};

export { SignUpForm };
