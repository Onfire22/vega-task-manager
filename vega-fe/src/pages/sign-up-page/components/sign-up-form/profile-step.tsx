import React from 'react';
import type { TSignUpFormValues } from '../../types.ts';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Controller, type UseFormReturn } from 'react-hook-form';

interface IProps {
	form: UseFormReturn<TSignUpFormValues>;
}

const ProfileStep: React.FC<IProps> = ({ form }) => {
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
		</>
	);
};

export { ProfileStep };
