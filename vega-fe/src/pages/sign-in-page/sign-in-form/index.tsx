import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { SignInFormView } from './sing-in-form-view';
import { SIGN_IN_DEFAULT_VALUES } from '../constants.ts';
import { SignUpValidationSchema } from '../validation.ts';
import { useSignInUserMutation } from '../../../api/queries/auth.api.ts';
import { useNavigate } from 'react-router-dom';
import { FRONT_ROUTES } from '../../../app/constants.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { toast } from 'sonner';

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
			try {
				await signInUser(values).unwrap();
				navigate(FRONT_ROUTES.root);
			} catch (e: unknown) {
				const error = e as { data?: { message?: string } };
				toast.error(error.data?.message ?? 'Something went wrong');
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
			{isLoading && <CustomLoader isFull />}
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
