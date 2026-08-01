import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useCreateCompanyMutation } from '@/api/companies/companies.api.ts';
import { toast } from 'sonner';
import { prepareSingleFileFormData } from '@/app/utils.ts';
import type { CompanySettingsFormValues, TScreenTypes } from '@/pages/initial-settings-page/types.ts';
import { INITIAL_COMPANY_SETTINGS_VALUES } from '@/pages/initial-settings-page/constants.ts';
import { InitialCompanySettingsValidationSchema } from '@/pages/initial-settings-page/validation.ts';
import { InitialCompanyFormView } from '@/pages/initial-settings-page/components/initial-company-form/initial-company-form-view.tsx';

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
			const response = await createCompany(prepareSingleFileFormData(values)).unwrap();
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
