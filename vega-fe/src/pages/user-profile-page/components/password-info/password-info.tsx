import { PasswordInfoView } from '@/pages/user-profile-page/components/password-info/password-info.view.tsx';
import { useForm } from 'react-hook-form';
import type { IPasswordForm } from '@/pages/user-profile-page/types.ts';
import { PASSWORD_INITIAL_VALUES } from '@/pages/user-profile-page/constants.ts';
import { PasswordSchema } from '@/pages/user-profile-page/validation.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateUserPasswordMutation } from '@/api/users/users.api.ts';
import { toast } from 'sonner';

const PasswordInfo = () => {
	const [updatePassword] = useUpdateUserPasswordMutation();

	const form = useForm<IPasswordForm>({
		defaultValues: PASSWORD_INITIAL_VALUES,
		resolver: zodResolver(PasswordSchema),
	});

	const handleSubmit = form.handleSubmit(async ({ currentPassword, newPassword }) => {
		try {
			await updatePassword({ currentPassword, newPassword }).unwrap();
			toast.success('Пароль успешно обновлен');
			form.reset();
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	const { isValid } = form.formState;

	return <PasswordInfoView formData={form} onSubmit={handleSubmit} isButtonDisabled={!isValid} />;
};

export { PasswordInfo };
