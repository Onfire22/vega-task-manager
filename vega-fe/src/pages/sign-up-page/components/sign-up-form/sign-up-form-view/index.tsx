import React from 'react';
import { Link } from 'react-router-dom';
import { Popup } from '../../popup';
import { CustomInputField } from '../../../../../ui/custom-input-field';
import { CustomForm } from '../../../../../ui/custom-form';
import { CustomButton } from '../../../../../ui/custom-button';
import './styles.less';

interface IProps {
	formValues: {
		email: string;
		password: string;
		passwordRepeat: string;
		name: string;
		secondName: string;
	};
	formErrors: {
		email?: string;
		password?: string;
		passwordRepeat?: string;
		name?: string;
		secondName?: string;
	};
	onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const SignUpFormView: React.FC<IProps> = ({
	formValues,
	formErrors,
	onFieldChange,
	onFormSubmit,
}) => {
	return (
		<div className="signup-form">
			<CustomForm title="Регистрация" onSubmit={onFormSubmit}>
				<CustomInputField
					id="email"
					type="email"
					label="Электронная почта"
					name="email"
					placeholder="username@address.com"
					value={formValues.email}
					error={formErrors.email}
					onChange={onFieldChange}
				/>
				<CustomInputField
					id="password"
					type="password"
					label="Пароль"
					name="password"
					placeholder="********"
					value={formValues.password}
					error={formErrors.password}
					onChange={onFieldChange}
					tooltip={<Popup />}
				/>
				<CustomInputField
					id="password-repeat"
					type="password"
					label="Повторите пароль"
					name="passwordRepeat"
					placeholder="********"
					value={formValues.passwordRepeat}
					error={formErrors.passwordRepeat}
					onChange={onFieldChange}
				/>
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
					id="secondName"
					type="text"
					label="Фамилия"
					name="secondName"
					placeholder="Иванов"
					value={formValues.secondName}
					error={formErrors.secondName}
					onChange={onFieldChange}
				/>
				<div className="signin-form__text">
					<span>Уже есть аккаунт? </span>
					<Link className="signin-form__link" to="/sign-in">
						Войти
					</Link>
				</div>
				<CustomButton type="submit">Зарегистрироваться</CustomButton>
			</CustomForm>
		</div>
	);
};

export { SignUpFormView };
