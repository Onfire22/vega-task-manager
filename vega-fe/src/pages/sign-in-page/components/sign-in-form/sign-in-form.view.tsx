import React from 'react';
import { Link } from 'react-router-dom';
import { AtSign, Lock } from 'lucide-react';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomPasswordInput } from '@/components/common/forms/custom-password-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { TSignInFormFormValues } from '@/pages/sign-in-page/types.ts';

interface IProps {
	loginRef: React.RefObject<HTMLInputElement | null>;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	form: UseFormReturn<TSignInFormFormValues>;
}

const SignInFormView: React.FC<IProps> = ({ form, loginRef, onFormSubmit }) => {
	return (
		<div className="w-full h-screen flex-centered-line">
			<div className="w-125">
				<form
					className="w-full p-7.5 flex-centered-column gap-2.5 border border-border rounded-[5px]"
					onSubmit={onFormSubmit}
				>
					<h1 className="text-2xl">Вход</h1>
					<div className="w-full">
						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<CustomInput
									id="email"
									type="text"
									label="Электронная почта"
									placeholder="username@host.com"
									value={field.value}
									onChange={field.onChange}
									error={fieldState.error?.message}
									leftIcon={<AtSign color="#D5D8DB" size={21} />}
									ref={loginRef}
									isRequired
								/>
							)}
						/>
					</div>
					<div className="w-full">
						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => (
								<CustomPasswordInput
									id="password"
									type="password"
									label="Пароль"
									placeholder="********"
									value={field.value}
									onChange={field.onChange}
									error={fieldState.error?.message}
									isRequired
									leftIcon={<Lock color="#D5D8DB" size={21} />}
								/>
							)}
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
