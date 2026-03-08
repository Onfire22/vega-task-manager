import React from 'react';
import { Select, TextInput } from '@mantine/core';
import type { IFormErrors, IFormValues, IOptions } from '../../../types.ts';
import './styles.less';

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
			<div className="profile-step__input">
				<TextInput
					id="name"
					type="text"
					label="Имя"
					name="name"
					placeholder="Иван"
					value={formValues.name}
					error={formErrors.name}
					onChange={onFieldChange}
					withAsterisk
				/>
			</div>
			<div className="profile-step__input">
				<TextInput
					id="secondName"
					type="text"
					label="Фамилия"
					name="secondName"
					placeholder="Иванов"
					value={formValues.secondName}
					error={formErrors.secondName}
					onChange={onFieldChange}
					withAsterisk
				/>
			</div>
			<div className="profile-step__input">
				<Select
					label="Специализация"
					placeholder="Выберите значение"
					name="userStackUuid"
					data={stackOptions}
					value={formValues.userStackUuid}
					onChange={(value) => {
						if (value) {
							onSelectFieldChange('userStackUuid', value);
						}
					}}
					error={formErrors?.userStackUuid}
					withAsterisk
				/>
			</div>
		</>
	);
};

export { ProfileStep };
