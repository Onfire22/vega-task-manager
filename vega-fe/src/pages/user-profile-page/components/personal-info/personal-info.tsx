import { PersonalInfoView } from '@/pages/user-profile-page/components/personal-info/personal-info.view.tsx';
import { PERSONAL_INITIAL_VALUES } from '@/pages/user-profile-page/constants.ts';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { usePersonalData } from '@/pages/user-profile-page/hooks.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalSchema } from '@/pages/user-profile-page/validation.ts';
import type { IPersonalForm } from '@/pages/user-profile-page/types.ts';
import { useUpdateUserMutation } from '@/api/users/users.api.ts';
import { toast } from 'sonner';

const PersonalInfo = () => {
	const { userData, options, isLoading } = usePersonalData();

	const [updateUser] = useUpdateUserMutation();

	const form = useForm<IPersonalForm>({
		defaultValues: PERSONAL_INITIAL_VALUES,
		resolver: zodResolver(PersonalSchema),
	});

	useEffect(() => {
		if (userData) {
			form.reset(userData);
		}
	}, [userData, form]);

	const { isDirty } = form.formState;

	const handleSubmit = form.handleSubmit(async (values) => {
		try {
			await updateUser(values).unwrap();
			toast.success('Профиль успешно обновлен');
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	return isLoading ? (
		<div>Loading</div>
	) : (
		<PersonalInfoView formData={form} options={options} onSubmit={handleSubmit} isButtonDisabled={!isDirty} />
	);
};

export { PersonalInfo };
