import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { useCheckIsEmailFreeMutation, useSignUpUserMutation } from '../../api/queries/auth.api.ts';
import { SIGNUP_DEFAULT_VALUES } from './constants.ts';
import { AccountStepValidationSchema, ProfileStepValidationSchema } from './validation.ts';
import { getActiveStepSelector } from './selectors.ts';
import { setActiveStep } from './slice.ts';
import { toast } from 'sonner';
import { type Resolver, useForm, useWatch } from 'react-hook-form';
import type { TSignUpFormValues } from '@/pages/sign-up-page/types.ts';

export const useSignUpForm = () => {
	const dispatch = useAppDispatch();

	const [signUpUser, { isLoading, isError }] = useSignUpUserMutation();
	const [checkIsEmailFree] = useCheckIsEmailFreeMutation();

	const activeStep = useAppSelector(getActiveStepSelector());

	const resolver: Resolver<TSignUpFormValues> = async (values) => {
		const schema = activeStep === 0 ? AccountStepValidationSchema : ProfileStepValidationSchema;

		const result = schema.safeParse(values);

		if (result.success) {
			return { values: result.data as TSignUpFormValues, errors: {} };
		}

		return {
			values: {},
			errors: result.error.issues.reduce(
				(acc, issue) => {
					const path = issue.path.join('.');
					acc[path] = { message: issue.message, type: 'validation' };
					return acc;
				},
				{} as Record<string, { message: string; type: string }>,
			),
		};
	};

	const form = useForm<TSignUpFormValues>({
		defaultValues: SIGNUP_DEFAULT_VALUES,
		resolver,
	});

	const handleSubmitForm = form.handleSubmit(async () => {
		try {
			const values = form.getValues();
			await signUpUser(values).unwrap();
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	const handleEmailCheck = async () => {
		const formValues = form.getValues();
		if (!formValues.email) return false;

		try {
			const response = await checkIsEmailFree(formValues.email).unwrap();
			if (response?.success) {
				return true;
			}
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}

		return false;
	};

	const handleNextStepClick = async () => {
		if (activeStep === 0) {
			const isEmailFree = await handleEmailCheck();

			if (!isEmailFree) return;
		}

		const isFormValid = await form.trigger();

		if (!isFormValid) return;

		if (activeStep === 1) {
			await handleSubmitForm();
		}

		dispatch(setActiveStep(activeStep < 1 ? activeStep + 1 : activeStep));
	};

	const handlePrevStepClick = () => {
		dispatch(setActiveStep(activeStep > 0 ? activeStep - 1 : activeStep));
	};

	const [email, password, passwordRepeat, name, secondName, userSpecialisationUuid] = useWatch({
		control: form.control,
		name: ['email', 'password', 'passwordRepeat', 'name', 'secondName', 'userSpecialisationUuid'],
		defaultValue: SIGNUP_DEFAULT_VALUES,
	});

	return {
		form,
		activeStep,
		isError,
		formValues: { email, password, passwordRepeat, name, secondName, userSpecialisationUuid },
		isSignUpLoading: isLoading,
		handleNextStepClick,
		handlePrevStepClick,
	};
};
