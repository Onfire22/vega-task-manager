import { Controller, type UseFormReturn } from 'react-hook-form';
import type { CompanySettingsFormValues } from '@/pages/super-admin-settings-page/types.ts';
import React from 'react';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { MoveRight } from 'lucide-react';
import { ScreenLayout } from '@/pages/super-admin-settings-page/components/screen-layout';
import { CustomFileInput } from '@/components/common/forms/custom-file-input.tsx';

interface IProps {
	form: UseFormReturn<CompanySettingsFormValues>;
	accentColor?: string;
	mainColor?: string;
	companyTitle?: string;
	onFormSubmit: () => void;
	onAvatarClear: () => void;
}

const InitialCompanyFormView: React.FC<IProps> = ({
	form,
	accentColor,
	mainColor,
	onFormSubmit,
	onAvatarClear,
	companyTitle,
}) => {
	return (
		<ScreenLayout
			title="Информация о компании"
			buttonText="Сохранить и продолжить"
			onButtonClick={onFormSubmit}
			icon={<MoveRight />}
		>
			<form className="grid grid-cols-2 w-full gap-5">
				<div className="flex flex-col gap-3 animate-in fade-in fill-mode-both duration-700 delay-500">
					<div>
						<h2 className="animate-in fade-in fill-mode-both duration-700 delay-300 mb-3">Настройки</h2>
						<div className="flex flex-col gap-2">
							<Controller
								name="companyAvatar"
								control={form.control}
								render={({ field }) => (
									<CustomFileInput
										value={field.value}
										onChange={field.onChange}
										onAvatarClear={onAvatarClear}
										placeholder="Логотип компании"
										alt="company avatar"
									/>
								)}
							/>
							<Controller
								name="companyTitle"
								control={form.control}
								render={({ field, fieldState }) => (
									<CustomInput
										id="companyTitle"
										type="text"
										label="Название комании"
										value={field.value}
										onChange={field.onChange}
										error={fieldState.error?.message}
										isRequired
									/>
								)}
							/>
							<Controller
								name="inn"
								control={form.control}
								render={({ field, fieldState }) => (
									<CustomInput
										id="inn"
										type="text"
										label="ИНН комании"
										value={field.value}
										onChange={field.onChange}
										error={fieldState.error?.message}
									/>
								)}
							/>
							<Controller
								name="address"
								control={form.control}
								render={({ field, fieldState }) => (
									<CustomInput
										id="address"
										type="text"
										label="Адрес комании"
										value={field.value}
										onChange={field.onChange}
										error={fieldState.error?.message}
									/>
								)}
							/>
							<div className="flex items-center gap-4">
								<Controller
									name="mainColor"
									control={form.control}
									render={({ field, fieldState }) => (
										<CustomInput
											className="flex-1"
											id="mainColor"
											type="color"
											label="Основной цвет"
											value={field.value}
											onChange={field.onChange}
											error={fieldState.error?.message}
										/>
									)}
								/>
								<Controller
									name="accentColor"
									control={form.control}
									render={({ field, fieldState }) => (
										<CustomInput
											className="flex-1"
											id="accentColor"
											type="color"
											label="Второстепенный цвет"
											value={field.value}
											onChange={field.onChange}
											error={fieldState.error?.message}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<h2 className="animate-in fade-in fill-mode-both duration-700 delay-300 mb-4">Предпросмотр</h2>
					<div className="border w-full h-full rounded-[10px]" style={{ backgroundColor: mainColor }}>
						<div className="w-full border-b h-10 flex items-center justify-end px-5 gap-2">
							<div className="w-3 h-3 bg-(--color-danger) rounded-full" />
							<div className="w-3 h-3 bg-(--color-amber) rounded-full" />
							<div className="w-3 h-3 bg-(--color-teal) rounded-full" />
						</div>
						<div className="p-4 flex flex-col w-full h-[calc(100%-40px)] gap-20 py-[50px] text-center">
							<div>{companyTitle}</div>
							<div className="text-muted-foreground">muted text</div>
							<div>
								<div
									className="p-2 bg-(--color-teal) rounded-[5px] cursor-pointer"
									style={{ backgroundColor: accentColor }}
								>
									Кнопка
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</ScreenLayout>
	);
};

export { InitialCompanyFormView };
