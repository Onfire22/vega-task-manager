import React from 'react';
import './styles.less';
import { CustomForm } from '../../../../ui/custom-form';
import { Link } from 'react-router-dom';
import { Button, TextInput } from '@mantine/core';
import Lock from '../../../../assets/icons/lock.svg?react';
import At from '../../../../assets/icons/at.svg?react';

interface IProps {
	formValues: {
		email: string;
		password: string;
	};
	formErrors: {
		email?: string;
		password?: string;
	};
	loginRef: React.RefObject<HTMLInputElement | null>;
	onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const SignInFormView: React.FC<IProps> = ({ formValues, formErrors, loginRef, onFieldChange, onFormSubmit }) => {
	return (
		<div className="signin-form">
			<CustomForm title="Вход" onSubmit={onFormSubmit}>
				<div className="signin-form__input">
					<TextInput
						id="email"
						type="text"
						label="Электронная почта"
						name="email"
						placeholder="username@host.com"
						value={formValues.email}
						error={formErrors.email}
						onChange={onFieldChange}
						withAsterisk
						leftSection={<At />}
						ref={loginRef}
					/>
				</div>
				<div className="signin-form__input">
					<TextInput
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
				<div className="signin-form__text">
					<span>Нет аккаунта? </span>
					<Link className="signin-form__link" to="/sign-up">
						Зарегистрироваться
					</Link>
				</div>
				<Button type="submit">Войти</Button>
			</CustomForm>
		</div>
	);
};

export { SignInFormView };
