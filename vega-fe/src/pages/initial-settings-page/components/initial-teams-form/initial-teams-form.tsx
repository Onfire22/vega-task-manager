import { useFieldArray, useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTeamsMutation } from '@/api/teams/teams.api.ts';
import { TEAMS_PRESETS } from '@/pages/initial-settings-page/teams-presets.ts';
import type { ITeamsPreset, TeamsSettingsFormValues } from '@/pages/initial-settings-page/types.ts';
import { DEFAULT_FIELD_VALUE, INITIAL_TEAMS_DEFAULT_VALUES } from '@/pages/initial-settings-page/constants.ts';
import { InitialTeamsValidationSchema } from '@/pages/initial-settings-page/validation.ts';
import { normalizeTeamsValues, transformAvatarPathRoFile } from '@/pages/initial-settings-page/utils.ts';
import { InitialTeamsFormView } from '@/pages/initial-settings-page/components/initial-teams-form/initial-teams-form-view.tsx';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const InitialTeamsForm = () => {
	const navigate = useNavigate();

	const [selectedPresets, setSelectedPresets] = useState(TEAMS_PRESETS);

	const [createTeams] = useCreateTeamsMutation();

	const form = useForm<TeamsSettingsFormValues>({
		defaultValues: INITIAL_TEAMS_DEFAULT_VALUES,
		resolver: zodResolver(InitialTeamsValidationSchema),
	});

	const { fields, append, remove, update } = useFieldArray({
		control: form.control,
		name: 'items',
	});

	const handlePresetSelect = async (selectedPreset: ITeamsPreset) => {
		const fields = form.getValues().items;
		const emptyFieldIndex = fields.findIndex((field) => field.teamTitle === '');
		const sameFieldIndex = fields.findIndex((field) => field.teamTitle === selectedPreset.fullName);
		const isNoEmptyFields = emptyFieldIndex === -1;
		const targetIndex = isNoEmptyFields ? fields.length : emptyFieldIndex;

		setSelectedPresets(
			selectedPresets.map((preset) => {
				return {
					...preset,
					isSelected: selectedPreset.id === preset.id ? !preset.isSelected : preset.isSelected,
				};
			}),
		);

		if (sameFieldIndex !== -1) {
			remove(sameFieldIndex);
			return;
		}

		update(targetIndex, {
			teamTitle: selectedPreset.fullName,
			teamAvatar: await transformAvatarPathRoFile(selectedPreset.avatarPath, selectedPreset.fullName),
			id: selectedPreset.id,
		});
	};

	const handleRemoveField = (index: number) => {
		const card = fields[index];
		remove(index);

		setSelectedPresets(
			selectedPresets.map((preset) => ({
				...preset,
				isSelected: card?.teamTitle !== preset.fullName ? preset.isSelected : false,
			})),
		);
	};

	const handleFieldAppend = () => {
		append(DEFAULT_FIELD_VALUE);
	};

	const handleSubmitForm = form.handleSubmit(async (values) => {
		try {
			const response = await createTeams(normalizeTeamsValues(values)).unwrap();
			if (response?.success) {
				toast.success('Настройка успешно завершена');
				localStorage.removeItem('isFirstLogin');
				navigate('/');
			}
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	return (
		<InitialTeamsFormView
			fields={fields}
			control={form.control}
			selectedPresets={selectedPresets}
			onFieldAppend={handleFieldAppend}
			onRemoveField={handleRemoveField}
			onPresetSelect={handlePresetSelect}
			onSubmitForm={handleSubmitForm}
		/>
	);
};

export { InitialTeamsForm };
