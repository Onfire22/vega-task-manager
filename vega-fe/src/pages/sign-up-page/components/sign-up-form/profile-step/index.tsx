import React from 'react';
import type { IFormErrors, IFormValues, IOptions } from '../../../types.ts';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';

interface IProps {
	formValues: IFormValues;
	formErrors: IFormErrors;
	stackOptions: Array<IOptions>;
	onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSelectFieldChange: (name: string, value: string) => void;
}

const ProfileStep: React.FC<IProps> = ({
	formValues,
	formErrors,
	onFieldChange,
	onSelectFieldChange,
	stackOptions,
}) => {
	return (
		<>
			<div className="min-h-16.5 mb-2.5">
				<CustomInput
					id="name"
					type="text"
					label="Имя"
					name="name"
					placeholder="Иван"
					value={formValues.name}
					error={formErrors.name}
					onChange={onFieldChange}
					isRequired
				/>
			</div>
			<div className="min-h-16.5 mb-2.5">
				<CustomInput
					id="secondName"
					type="text"
					label="Фамилия"
					name="secondName"
					placeholder="Иванов"
					value={formValues.secondName}
					error={formErrors.secondName}
					onChange={onFieldChange}
					isRequired
				/>
			</div>
			<div className="min-h-16.5 mb-2.5">
				<CustomSelect
					label="Специализация"
					placeholder="Выберите значение"
					name="userStackUuid"
					options={stackOptions}
					value={formValues.userSpecialisationUuid}
					onChange={(value) => {
						if (value) {
							onSelectFieldChange('userSpecialisationUuid', value);
						}
					}}
					error={formErrors?.userSpecialisationUuid}
					isRequired
				/>
			</div>
		</>
	);
};

export { ProfileStep };
