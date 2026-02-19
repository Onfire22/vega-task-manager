import React from 'react';
import { CustomInputField } from '../../../../../ui/custom-input-field';
import { CustomForm } from '../../../../../ui/custom-form';
import { CustomButton } from '../../../../../ui/custom-button';
import './styles.less';

interface IProps {
	formValues: {
		name: string;
		surname: string;
	};
	formErrors: {
		name?: string;
		surname?: string;
	};
	onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const InfoFormView: React.FC<IProps> = ({
	formValues,
	formErrors,
	onFieldChange,
	onFormSubmit,
}) => {
	return (
		<div className="info-form">
			<CustomForm title="Личная информация" onSubmit={onFormSubmit}>
				<CustomInputField
					id="name"
					type="text"
					label="Имя"
					name="name"
					placeholder="Иван"
					value={formValues.name}
					error={formErrors.name}
					onChange={onFieldChange}
				/>
				<CustomInputField
					id="surname"
					type="text"
					label="Фамилия"
					name="surname"
					placeholder="Иванов"
					value={formValues.surname}
					error={formErrors.surname}
					onChange={onFieldChange}
				/>
				<CustomButton type="submit">Приступить</CustomButton>
			</CustomForm>
		</div>
	);
};

export { InfoFormView };
