import { PersonalInfoView } from '@/pages/user-profile-page/components/personal-info/personal-info.view.tsx';
import { PERSONAL_INITIAL_VALUES } from '@/pages/user-profile-page/constants.ts';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { usePersonalData } from '@/pages/user-profile-page/hooks.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalSchema } from '@/pages/user-profile-page/validation.ts';
import type { IPersonalForm } from '@/pages/user-profile-page/types.ts';

const PersonalInfo = () => {
	const { userData, options, isLoading } = usePersonalData();

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

	const handleSubmit = form.handleSubmit((values) => console.log(values));

	return isLoading ? (
		<div>Loading</div>
	) : (
		<PersonalInfoView formData={form} options={options} onSubmit={handleSubmit} isButtonDisabled={!isDirty} />
	);
};

export { PersonalInfo };
