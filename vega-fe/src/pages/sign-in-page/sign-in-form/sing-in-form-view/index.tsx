import React from 'react';
import './styles.less';
import { CustomInputField } from '../../../../ui/custom-input-field';
import { CustomForm } from '../../../../ui/custom-form';
import { CustomButton } from '../../../../ui/custom-button';
import { Link } from 'react-router-dom';

interface IProps {
	formValues: {
		email: string;
		password: string;
	};
	formErrors: {
		email?: string;
		password?: string;
	};
	onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const SignInFormView: React.FC<IProps> = ({
	formValues,
	formErrors,
	onFieldChange,
	onFormSubmit,
}) => {
	return (
		<div className="signin-form">
			<CustomForm title="Вход" onSubmit={onFormSubmit}>
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
				/>
				<div className="signin-form__text">
					<span>Нет аккаунта? </span>
					<Link className="signin-form__link" to="/sign-up">
						Зарегистрироваться
					</Link>
				</div>
				<CustomButton type="submit">Войти</CustomButton>
			</CustomForm>
		</div>
	);
};

export { SignInFormView };
