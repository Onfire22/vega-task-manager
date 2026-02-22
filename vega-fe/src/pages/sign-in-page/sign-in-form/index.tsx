import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { SignInFormView } from './sing-in-form-view';
import { SIGN_IN_DEFAULT_VALUES } from '../constants.ts';
import { SignUpValidationSchema } from '../validation.ts';
import { useSignInUserMutation } from '../../../api/queries/auth.api.ts';
import { useNavigate } from 'react-router-dom';
import { FRONT_ROUTES } from '../../../constants.ts';
import { LoadingOverlay } from '@mantine/core';

const SignUpForm = () => {
	const loginRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const [signInUser, { isLoading }] = useSignInUserMutation();

	useEffect(() => {
		if (loginRef?.current) {
			loginRef.current.focus();
		}
	}, []);

	const formik = useFormik({
		initialValues: SIGN_IN_DEFAULT_VALUES,
		validationSchema: SignUpValidationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			const response = await signInUser(values);
			if (response?.data?.success) {
				navigate(FRONT_ROUTES.root);
			}
		},
	});

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		formik.setFieldError(name, '');
		formik.handleChange(e);
	};

	return (
		<>
			<LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
			<SignInFormView
				formValues={formik.values}
				formErrors={formik.errors}
				loginRef={loginRef}
				onFieldChange={handleFieldChange}
				onFormSubmit={formik.handleSubmit}
			/>
		</>
	);
};

export { SignUpForm };
