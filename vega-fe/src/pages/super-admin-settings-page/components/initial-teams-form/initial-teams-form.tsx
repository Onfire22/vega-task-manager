import { useFieldArray, useForm } from 'react-hook-form';
import { useState } from 'react';
import type { ITeamsPreset, TeamsSettingsFormValues } from '@/pages/super-admin-settings-page/types.ts';
import { InitialTeamsFormView } from '@/pages/super-admin-settings-page/components/initial-teams-form/initial-teams-form-view.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { InitialTeamsValidationSchema } from '@/pages/super-admin-settings-page/validation.ts';
import { DEFAULT_FIELD_VALUE, INITIAL_TEAMS_DEFAULT_VALUES } from '@/pages/super-admin-settings-page/constants.ts';
import { TEAMS_PRESETS } from '@/pages/super-admin-settings-page/teams-presets.ts';
import { normalizeTeamsValues, transformAvatarPathRoFile } from '@/pages/super-admin-settings-page/utils.ts';

const InitialTeamsForm = () => {
	const [selectedPresets, setSelectedPresets] = useState(TEAMS_PRESETS);

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
					isSelected: selectedPreset.presetId === preset.presetId ? !preset.isSelected : preset.isSelected,
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
			presetId: selectedPreset.presetId,
		});
	};

	const handleRemoveField = (index: number) => {
		const card = fields[index];
		remove(index);

		setSelectedPresets(
			selectedPresets.map((preset) => ({
				...preset,
				isSelected: card?.presetId !== preset.presetId ? preset.isSelected : false,
			})),
		);
	};

	const handleFieldAppend = () => {
		append(DEFAULT_FIELD_VALUE);
	};

	const handleSubmitForm = form.handleSubmit(async (values) => {
		console.log(normalizeTeamsValues(values));
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
