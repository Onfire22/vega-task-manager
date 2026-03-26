import React from 'react';
import { Link } from 'react-router-dom';
import { AtSign, Lock } from 'lucide-react';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomPasswordInput } from '@/components/common/forms/custom-password-input.tsx';
import { Button } from '@/components/ui/button.tsx';

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
		<div className="w-full h-screen flex-centered-line">
			<div className="w-125">
				<form
					className="w-full p-7.5 flex-centered-column gap-2.5 border border-border rounded-[5px]"
					onSubmit={onFormSubmit}
				>
					<h1 className="text-2xl">Вход</h1>
					<div className="w-full">
						<CustomInput
							id="email"
							type="text"
							label="Электронная почта"
							name="email"
							placeholder="username@host.com"
							value={formValues.email}
							error={formErrors.email}
							onChange={onFieldChange}
							leftIcon={<AtSign color="#D5D8DB" size={21} />}
							ref={loginRef}
							isRequired
						/>
					</div>
					<div className="w-full">
						<CustomPasswordInput
							id="password"
							type="password"
							label="Пароль"
							name="password"
							placeholder="********"
							value={formValues.password}
							error={formErrors.password}
							onChange={onFieldChange}
							isRequired
							leftIcon={<Lock color="#D5D8DB" size={21} />}
						/>
					</div>
					<div className="my-2.5 text-sm">
						<span>Нет аккаунта? </span>
						<Link className="link-styled" to="/sign-up">
							Зарегистрироваться
						</Link>
					</div>
					<Button type="submit" size="lg" variant="primary">
						Войти
					</Button>
				</form>
			</div>
		</div>
	);
};

export { SignInFormView };
