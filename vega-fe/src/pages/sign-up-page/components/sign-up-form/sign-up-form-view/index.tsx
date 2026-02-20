import React from 'react';
import { Link } from 'react-router-dom';
import { CustomForm } from '../../../../../ui/custom-form';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import Lock from '../../../../../assets/icons/lock.svg?react';
import At from '../../../../../assets/icons/at.svg?react';
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
				<div className="signup-form__input">
					<TextInput
						id="email"
						type="email"
						label="Электронная почта"
						name="email"
						placeholder="username@address.com"
						value={formValues.email}
						error={formErrors.email}
						onChange={onFieldChange}
						withAsterisk
						leftSection={<At />}
					/>
				</div>
				<div className="signup-form__input">
					<PasswordInput
						id="password"
						type="password"
						label="Пароль"
						name="password"
						placeholder="********"
						value={formValues.password}
						error={formErrors.password}
						onChange={onFieldChange}
						withAsterisk
						leftSection={<Lock />}
					/>
				</div>
				<div className="signup-form__input">
					<PasswordInput
						id="password-repeat"
						type="password"
						label="Повторите пароль"
						name="passwordRepeat"
						placeholder="********"
						value={formValues.passwordRepeat}
						error={formErrors.passwordRepeat}
						onChange={onFieldChange}
						withAsterisk
						leftSection={<Lock />}
					/>
				</div>
				<div className="signup-form__group">
					<div className="signup-form__input">
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
					<div className="signup-form__input">
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
				</div>
				<div className="signup-form__text">
					<span>Уже есть аккаунт? </span>
					<Link className="signup-form__link" to="/sign-in">
						Войти
					</Link>
				</div>
				<Button className="button" type="submit">
					Зарегистрироваться
				</Button>
			</CustomForm>
		</div>
	);
};

export { SignUpFormView };
