import React from 'react';
import type { IOptions, TSignUpFormValues } from '../../types.ts';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { Controller, type UseFormReturn } from 'react-hook-form';

interface IProps {
	stackOptions: Array<IOptions>;
	form: UseFormReturn<TSignUpFormValues>;
}

const ProfileStep: React.FC<IProps> = ({ stackOptions, form }) => {
	return (
		<>
			<div className="min-h-16.5 mb-2.5">
				<Controller
					name="name"
					control={form.control}
					render={({ field, fieldState }) => (
						<CustomInput
							id="name"
							type="text"
							label="Имя"
							placeholder="Иван"
							value={field.value}
							onChange={field.onChange}
							error={fieldState.error?.message}
							isRequired
						/>
					)}
				/>
			</div>
			<div className="min-h-16.5 mb-2.5">
				<Controller
					name="secondName"
					control={form.control}
					render={({ field, fieldState }) => (
						<CustomInput
							id="secondName"
							type="text"
							label="Фамилия"
							placeholder="Иванов"
							value={field.value}
							onChange={field.onChange}
							error={fieldState.error?.message}
							isRequired
						/>
					)}
				/>
			</div>
			<div className="min-h-16.5 mb-2.5">
				<Controller
					name="userSpecialisationUuid"
					control={form.control}
					render={({ field, fieldState }) => (
						<CustomSelect
							label="Специализация"
							placeholder="Выберите значение"
							options={stackOptions}
							value={field.value}
							onChange={field.onChange}
							error={fieldState.error?.message}
							isRequired
						/>
					)}
				/>
			</div>
		</>
	);
};

export { ProfileStep };
