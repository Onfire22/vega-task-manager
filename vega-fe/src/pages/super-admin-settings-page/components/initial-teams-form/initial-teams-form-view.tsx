import { Controller, type Control, type FieldArrayWithId } from 'react-hook-form';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import React from 'react';
import type { ITeamsPreset, TeamsSettingsFormValues, TTeamsPresets } from '@/pages/super-admin-settings-page/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { Camera, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { ScreenLayout } from '@/pages/super-admin-settings-page/components/screen-layout';

interface IProps {
	control: Control<TeamsSettingsFormValues>;
	fields: Array<FieldArrayWithId<TeamsSettingsFormValues, 'items', 'id'>>;
	onFieldAppend: () => void;
	selectedPresets: TTeamsPresets;
	onPresetSelect: (selectedPreset: ITeamsPreset) => void;
	onRemoveField: (index: number) => void;
	onSubmitForm: () => void;
}

const InitialTeamsFormView: React.FC<IProps> = ({
	fields,
	control,
	onFieldAppend,
	onPresetSelect,
	selectedPresets,
	onRemoveField,
	onSubmitForm,
}) => {
	return (
		<ScreenLayout title="Создание команд" buttonText="Завершить настройку" onButtonClick={onSubmitForm}>
			<div className="grid grid-cols-2 w-full">
				<div className="flex flex-col gap-3">
					<h2 className="animate-in fade-in fill-mode-both duration-700 delay-300">Создать из пресета</h2>
					<div className="flex flex-wrap gap-2 animate-in fade-in fill-mode-both duration-700 delay-400">
						{selectedPresets.map((card) => (
							<div
								onClick={() => onPresetSelect(card)}
								key={card.presetId}
								className={cn(
									'flex flex-1 basis-0 min-w-30 max-w-30 items-center gap-2 border rounded-2xl p-0.5 px-2 cursor-pointer hover:bg-accent',
									card.isSelected && 'border-primary',
								)}
							>
								<img
									src={`${card.avatarPath}`}
									alt="team avatar"
									className="w-7.5 h-7.5 rounded-full object-cover shrink-0"
								/>
								<span className="truncate">{card.fullName}</span>
							</div>
						))}
					</div>
				</div>
				<form className="flex flex-col gap-3 animate-in fade-in fill-mode-both duration-700 delay-400">
					<h2 className="animate-in fade-in fill-mode-both duration-700 delay-500">Создать свою команду</h2>
					<div className="max-h-[50vh] overflow-y-auto scrollbar-custom">
						{fields.map((field, index) => (
							<div key={field.id} className="flex flex-col gap-3.75">
								<div className="flex items-center gap-2 border rounded-[5px] p-1">
									<Controller
										control={control}
										name={`items.${index}.teamAvatar`}
										render={({ field: avatarField }) => {
											return avatarField.value ? (
												<img
													src={URL.createObjectURL(avatarField.value)}
													alt="team avatar"
													className="w-[40px] h-[40px] rounded-full object-cover"
												/>
											) : (
												<label className="flex items-center justify-center p-2 bg-secondary rounded cursor-pointer">
													<Camera />
													<input
														type="file"
														accept="image/*"
														style={{ display: 'none' }}
														onChange={(e) => {
															const file = e.target.files?.[0] ?? null;
															avatarField.onChange(file);
														}}
													/>
												</label>
											);
										}}
									/>
									<Controller
										control={control}
										name={`items.${index}.teamTitle`}
										render={({ field: controllerField, fieldState }) => (
											<CustomInput
												placeholder="Название команды, например, frontend, C#..."
												className="flex-1"
												value={controllerField.value}
												onChange={controllerField.onChange}
												name={controllerField.name}
												ref={controllerField.ref}
												error={fieldState.error?.message}
												isBordered={false}
											/>
										)}
									/>
									<Button type="button" onClick={() => onRemoveField(index)}>
										<Trash2 />
									</Button>
								</div>
							</div>
						))}
					</div>
					<Button variant="primary" type="button" onClick={onFieldAppend}>
						Добавить команду <Plus />
					</Button>
				</form>
			</div>
		</ScreenLayout>
	);
};

export { InitialTeamsFormView };
