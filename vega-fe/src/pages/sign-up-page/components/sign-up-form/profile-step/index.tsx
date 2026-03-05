import { Select, TextInput } from '@mantine/core';
import React from 'react';
import './styles.less';

interface IProps {
	formValues: {
		email: string;
		password: string;
		passwordRepeat: string;
		name: string;
		secondName: string;
		stackUuid: string;
	};
	formErrors: {
		email?: string;
		password?: string;
		passwordRepeat?: string;
		name?: string;
		secondName?: string;
		stackUuid?: string;
	};
	stackOptions: Array<{ label: string; value: string }>;
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
					name="stackUuid"
					data={stackOptions}
					value={formValues.stackUuid}
					onChange={(value) => {
						if (value) {
							onSelectFieldChange('stackUuid', value);
						}
					}}
					error={formErrors?.stackUuid}
					withAsterisk
				/>
			</div>
		</>
	);
};

export { ProfileStep };
