import { SignUpFormView } from './sign-up-form-view';
import { useFormik } from 'formik';
import { SIGNUP_DEFAULT_VALUES } from '../../constants.ts';
import { SignUpValidationSchema } from '../../validation.ts';
import React from 'react';
import { useSignUpUserMutation } from '../../api.ts';

const SignUpForm = () => {
	const [signUpUser] = useSignUpUserMutation();

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

	return (
		<SignUpFormView
			formValues={formik.values}
			formErrors={formik.errors}
			onFieldChange={handleFieldChange}
			onFormSubmit={formik.handleSubmit}
		/>
	);
};

export { SignUpForm };
