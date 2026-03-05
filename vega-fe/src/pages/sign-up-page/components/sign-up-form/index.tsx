import { SignUpFormView } from './sign-up-form-view';
import { useFormik } from 'formik';
import { PASSWORD_REQUIREMENTS, RED_COLOR, SIGNUP_DEFAULT_VALUES, TEAL_COLOR, YELLOW_COLOR } from '../../constants.ts';
import { AccountStepValidationSchema, ProfileStepValidationSchema } from '../../validation.ts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useCheckIsEmailFreeMutation, useSignUpUserMutation } from '../../../../api/queries/auth.api.ts';
import { generateRandomPassword, getPasswordStrength } from '../../utils.ts';
import { setNotification } from '../../../../modules/notifications/slice.ts';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { getActiveStepSelector } from '../../selectors.ts';
import { useDictionariesOptions } from '../../../../api/hooks.ts';
import { LoadingOverlay } from '@mantine/core';

const SignUpForm = () => {
	const dispatch = useAppDispatch();

	const [isPopoverOpened, setPopoverOpened] = useState(false);

	const passwordRef = useRef<HTMLInputElement>(null);

	const emailRef = useRef<HTMLInputElement>(null);

	const activeStep = useAppSelector(getActiveStepSelector());

	const [signUpUser, { isLoading }] = useSignUpUserMutation();

	const [checkIsEmailFree] = useCheckIsEmailFreeMutation();

	const { dictionariesOptions } = useDictionariesOptions(['STACK_TYPE']);

	useEffect(() => {
		if (emailRef?.current) {
			emailRef.current.focus();
		}
	}, []);

	const formik = useFormik({
		initialValues: SIGNUP_DEFAULT_VALUES,
		validationSchema: activeStep === 0 ? AccountStepValidationSchema : ProfileStepValidationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			try {
				await signUpUser(values).unwrap();
			} catch (e) {
				const error = e as { data?: { message?: string } };
				dispatch(
					setNotification({
						type: 'error',
						text: error.data?.message ?? 'Something went wrong',
					}),
				);
			}
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

	const handleEmailCheck = async () => {
		if (!formik.values.email) return false;

		try {
			const response = await checkIsEmailFree(formik.values.email).unwrap();
			if (response?.success) {
				return true;
			}
		} catch (e) {
			const error = e as { data?: { message?: string } };
			dispatch(
				setNotification({
					type: 'error',
					text: error.data?.message ?? 'Something went wrong',
				}),
			);
		}

		return false;
	};

	const handleFormikValidate = async () => {
		const result = await formik.validateForm();
		return !Object.keys(result).length;
	};

	const handleSelectFieldChange = (name: string, value: string) => {
		formik.setFieldError(name, '');
		formik.setFieldValue(name, value);
	};

	const isNextButtonDisabled = useMemo(() => {
		if (activeStep === 0) {
			return !(formik.values.email && formik.values.password && formik.values.passwordRepeat);
		}

		if (activeStep === 1) {
			return !(formik.values.name && formik.values.secondName && formik.values.stackUuid);
		}

		return false;
	}, [
		activeStep,
		formik.values.email,
		formik.values.password,
		formik.values.passwordRepeat,
		formik.values.name,
		formik.values.secondName,
		formik.values.stackUuid,
	]);

	return (
		<>
			<LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
			<SignUpFormView
				activeStep={activeStep}
				formValues={formik.values}
				formErrors={formik.errors}
				isPopoverOpened={isPopoverOpened}
				popoverData={popoverData}
				passwordRef={passwordRef}
				emailRef={emailRef}
				isNextButtonDisabled={isNextButtonDisabled}
				stackOptions={dictionariesOptions?.stack_type}
				onFieldChange={handleFieldChange}
				onFormSubmit={formik.handleSubmit}
				onPopoverOpened={handlePopoverOpened}
				onGeneratePasswordClick={handleGeneratePasswordClick}
				onEmailCheck={handleEmailCheck}
				onFormikValidate={handleFormikValidate}
				onSelectFieldChange={handleSelectFieldChange}
			/>
		</>
	);
};

export { SignUpForm };
