import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { useCheckIsEmailFreeMutation, useSignUpUserMutation } from '../../api/queries/auth.api.ts';
import { useFormik } from 'formik';
import { SIGNUP_DEFAULT_VALUES } from './constants.ts';
import { AccountStepValidationSchema, ProfileStepValidationSchema } from './validation.ts';
import { setNotification } from '../../modules/notifications/slice.ts';
import { getActiveStepSelector } from './selectors.ts';
import { setActiveStep } from './slice.ts';

export const useSignUpForm = () => {
	const dispatch = useAppDispatch();

	const [signUpUser, { isLoading, isError }] = useSignUpUserMutation();
	const [checkIsEmailFree] = useCheckIsEmailFreeMutation();

	const activeStep = useAppSelector(getActiveStepSelector());

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

	const handleNextStepClick = async () => {
		if (activeStep === 0) {
			const isEmailFree = await handleEmailCheck();

			if (!isEmailFree) return;
		}

		const validationResult = await formik.validateForm();
		console.log(validationResult);

		const isFormValid = !Object.keys(validationResult).length;

		if (!isFormValid) return;

		if (activeStep === 1) {
			formik.handleSubmit();
		}

		dispatch(setActiveStep(activeStep < 2 ? activeStep + 1 : activeStep));
	};

	const handlePrevStepClick = () => {
		dispatch(setActiveStep(activeStep > 0 ? activeStep - 1 : activeStep));
	};

	return {
		formik,
		activeStep,
		isError,
		isSignUpLoading: isLoading,
		handleNextStepClick,
		handlePrevStepClick,
	};
};
