import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { Button } from '@/components/ui/button.tsx';
import React from 'react';
import type { IOption, IPersonalForm } from '@/pages/user-profile-page/types.ts';
import { Controller, type UseFormReturn } from 'react-hook-form';

interface IProps {
	formData: UseFormReturn<IPersonalForm>;
	options: Array<IOption>;
	isButtonDisabled: boolean;
	onSubmit: () => void;
}

const PersonalInfoView: React.FC<IProps> = ({ formData, options, isButtonDisabled, onSubmit }) => {
	return (
		<div className="bg-card rounded-lg">
			<form onSubmit={onSubmit}>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end">
					<div className="px-4.5 py-3.5">
						<p className="text-white">Личные данные</p>
						<p className="text-[12px] text-muted-foreground">
							Отображается в задачах, комментариях и упоминаниях
						</p>
					</div>
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Имя</p>
					<Controller
						name="name"
						control={formData.control}
						render={({ field, fieldState }) => (
							<CustomInput
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						)}
					/>
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Фамилия</p>
					<Controller
						name="secondName"
						control={formData.control}
						render={({ field, fieldState }) => (
							<CustomInput
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								type="text"
							/>
						)}
					/>
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<div className="px-4.5 py-3.5">
						<p className="text-white ">Юзернейм</p>
						<p className="text-[12px] text-muted-foreground">Используется в @упоминаниях</p>
					</div>
					<Controller
						name="userName"
						control={formData.control}
						render={({ field, fieldState }) => (
							<CustomInput
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								type="text"
							/>
						)}
					/>
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Должность / роль</p>
					<Controller
						name="userSpecialisationUuid"
						control={formData.control}
						render={({ field, fieldState }) => (
							<CustomSelect
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								options={options}
							/>
						)}
					/>
				</div>
				{/*<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">*/}
				{/*	<p className="text-white px-4.5 py-3.5">Команда</p>*/}
				{/*	<CustomSelect options={[]} onChange={() => {}} value="" />*/}
				{/*</div>*/}
				{/*<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">*/}
				{/*	<p className="text-white px-4.5 py-3.5">Часовой пояс</p>*/}
				{/*	<CustomSelect options={[]} onChange={() => {}} value="" />*/}
				{/*</div>*/}
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75 py-2.5">
					<Button variant="primary" type="submit" disabled={isButtonDisabled}>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	);
};

export { PersonalInfoView };
