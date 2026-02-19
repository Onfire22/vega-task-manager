import { useFormik } from 'formik';
import React from 'react';
import { SignInFormView } from './sing-in-form-view';
import { SIGN_IN_DEFAULT_VALUES } from '../constants.ts';
import { SignUpValidationSchema } from '../validation.ts';

const SignUpForm = () => {
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
			onFieldChange={handleFieldChange}
			onFormSubmit={formik.handleSubmit}
		/>
	);
};

export { SignUpForm };
