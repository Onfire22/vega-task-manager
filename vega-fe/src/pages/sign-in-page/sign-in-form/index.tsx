import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { SignInFormView } from './sing-in-form-view';
import { SIGN_IN_DEFAULT_VALUES } from '../constants.ts';
import { SignUpValidationSchema } from '../validation.ts';
import { useSignInUserMutation } from '../../../api/queries/auth.api.ts';
import { useNavigate } from 'react-router-dom';
import { FRONT_ROUTES } from '../../../shared/constants.ts';
import { LoadingOverlay } from '@mantine/core';
import { useAppDispatch } from '../../../store/hooks.ts';
import { setNotification } from '../../../components/notifications/slice.ts';

const SignUpForm = () => {
	const loginRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
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
			console.log(response);
			if (response?.data?.user) {
				navigate(FRONT_ROUTES.root);
			} else {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				dispatch(setNotification({ type: 'error', text: response.error?.data.message }));
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
