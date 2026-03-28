import { PasswordInfoView } from '@/pages/user-profile-page/components/password-info/password-info.view.tsx';
import { useForm } from 'react-hook-form';
import type { IPasswordForm } from '@/pages/user-profile-page/types.ts';
import { PASSWORD_INITIAL_VALUES } from '@/pages/user-profile-page/constants.ts';
import { PasswordSchema } from '@/pages/user-profile-page/validation.ts';
import { zodResolver } from '@hookform/resolvers/zod';

const PasswordInfo = () => {
	const form = useForm<IPasswordForm>({
		defaultValues: PASSWORD_INITIAL_VALUES,
		resolver: zodResolver(PasswordSchema),
	});

	const handleSubmit = form.handleSubmit((values) => console.log(values));

	const { isValid } = form.formState;

	return <PasswordInfoView formData={form} onSubmit={handleSubmit} isButtonDisabled={!isValid} />;
};

export { PasswordInfo };
