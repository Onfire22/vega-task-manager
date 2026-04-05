import { useEffect, useRef } from 'react';
import { SignInFormView } from './sign-in-form.view.tsx';
import { SIGN_IN_DEFAULT_VALUES } from '../../constants.ts';
import { SignUpValidationSchema } from '../../validation.ts';
import { useSignInUserMutation } from '../../../../api/auth/auth.api.ts';
import { useNavigate } from 'react-router-dom';
import { FRONT_ROUTES } from '../../../../app/constants.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import type { TSignInFormFormValues } from '@/pages/sign-in-page/types.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/store/hooks.ts';
import { setToken } from '@/store/authSlice.ts';
import { baseApi } from '@/api';

const SignUpForm = () => {
	const loginRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [signInUser, { isLoading }] = useSignInUserMutation();

	useEffect(() => {
		if (loginRef?.current) {
			loginRef.current.focus();
		}
	}, []);

	const form = useForm<TSignInFormFormValues>({
		defaultValues: SIGN_IN_DEFAULT_VALUES,
		resolver: zodResolver(SignUpValidationSchema),
	});

	const handleSubmitForm = form.handleSubmit(async (values) => {
		try {
			const token = await signInUser(values).unwrap();
			dispatch(setToken(token.accessToken));
			dispatch(baseApi.util.invalidateTags(['CurrentUser']));
			navigate(FRONT_ROUTES.root);
		} catch (e: unknown) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	return (
		<>
			{isLoading && <CustomLoader isFull />}
			<SignInFormView form={form} loginRef={loginRef} onFormSubmit={handleSubmitForm} />
		</>
	);
};

export { SignUpForm };
