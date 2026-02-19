import { CustomInputField } from '../../../../../ui/custom-input-field';
import Arrow from '../../../../../assets/icons/arrow.svg?react';
import './styles.less';
import { Popup } from '../../popup';
import { CustomForm } from '../../../../../ui/custom-form';
import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
	formValues: {
		email: string;
		password: string;
		passwordRepeat: string;
	};
	formErrors: {
		email?: string;
		password?: string;
		passwordRepeat?: string;
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
				<div className="signin-form__text">
					<span>Уже есть аккаунт? </span>
					<Link className="signin-form__link" to="/sign-in">
						Войти
					</Link>
				</div>
				<button className="signup-form__button" type="submit">
					<Arrow
						width={40}
						height={40}
						className="signup-form__icon"
					/>
				</button>
			</CustomForm>
		</div>
	);
};

export { SignUpFormView };
