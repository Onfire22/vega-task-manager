import { InitialCompanyFormView } from '@/pages/super-admin-settings-page/components/initial-company-form/initial-company-form-view.tsx';
import { useForm, useWatch } from 'react-hook-form';
import type { CompanySettingsFormValues, TScreenTypes } from '@/pages/super-admin-settings-page/types.ts';
import { INITIAL_COMPANY_SETTINGS_VALUES } from '@/pages/super-admin-settings-page/constants.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { InitialCompanySettingsValidationSchema } from '@/pages/super-admin-settings-page/validation.ts';
import React from 'react';
import { useCreateCompanyMutation } from '@/api/companies/companies.api.ts';
import { toast } from 'sonner';

interface IProps {
	onNextStepClick: (step: TScreenTypes) => void;
}

const InitialCompanyForm: React.FC<IProps> = ({ onNextStepClick }) => {
	const [createCompany] = useCreateCompanyMutation();

	const form = useForm<CompanySettingsFormValues>({
		defaultValues: INITIAL_COMPANY_SETTINGS_VALUES,
		resolver: zodResolver(InitialCompanySettingsValidationSchema),
	});

	const { accentColor, mainColor, companyTitle } = useWatch({ control: form.control });

	const handleFormSubmit = form.handleSubmit(async (values) => {
		try {
			const response = await createCompany(values).unwrap();
			if (response?.success) {
				onNextStepClick('teams');
			}
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	const handleAvatarClear = () => {
		form.setValue('companyAvatar', undefined);
	};

	return (
		<InitialCompanyFormView
			form={form}
			accentColor={accentColor}
			mainColor={mainColor}
			companyTitle={companyTitle}
			onFormSubmit={handleFormSubmit}
			onAvatarClear={handleAvatarClear}
		/>
	);
};

export { InitialCompanyForm };
