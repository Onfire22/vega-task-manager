import React from 'react';
import { Link } from 'react-router-dom';
import { CustomForm } from '../../../../../ui/custom-form';
import { Button, PasswordInput, Popover, Progress, TextInput } from '@mantine/core';
import { PasswordRequirement } from '../../password-requirement';
import { MINIMAL_PASSWORD_LENGTH, PASSWORD_REQUIREMENTS, VALIDATION_MESSAGES } from '../../../constants.ts';
import { IconAt, IconLock } from '@tabler/icons-react';
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
	isPopoverOpened: boolean;
	passwordRef: React.RefObject<HTMLInputElement | null>;
	emailRef: React.RefObject<HTMLInputElement | null>;
	popoverData: { strength: number; color: string };
	onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	onPopoverOpened: (value: boolean) => void;
	onGeneratePasswordClick: () => void;
}

const SignUpFormView: React.FC<IProps> = ({
	formValues,
	formErrors,
	isPopoverOpened,
	popoverData,
	onFieldChange,
	onFormSubmit,
	onPopoverOpened,
	onGeneratePasswordClick,
	passwordRef,
	emailRef,
}) => {
	return (
		<div className="signup-form">
			<CustomForm title="Регистрация" onSubmit={onFormSubmit}>
				<div className="signup-form__input">
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
						leftSection={<IconAt color="#D5D8DB" size={23} />}
						ref={emailRef}
					/>
				</div>
				<div className="signup-form__input signup-form__input_random">
					<a className="signup-form__generator" onClick={onGeneratePasswordClick}>
						generate random
					</a>
					<Popover
						opened={isPopoverOpened}
						position="bottom"
						width="target"
						shadow="md"
						transitionProps={{ transition: 'pop' }}
					>
						<Popover.Target>
							<div
								onFocusCapture={() => onPopoverOpened(true)}
								onBlurCapture={() => onPopoverOpened(false)}
							>
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
									leftSection={<IconLock color="#D5D8DB" size={23} />}
									ref={passwordRef}
								/>
							</div>
						</Popover.Target>
						<Popover.Dropdown>
							<Progress color={popoverData.color} value={popoverData.strength} size={5} mb="xs" />
							<PasswordRequirement
								label={VALIDATION_MESSAGES.passwordLength}
								meets={formValues.password.length > MINIMAL_PASSWORD_LENGTH}
							/>
							{PASSWORD_REQUIREMENTS.map((requirement, index) => {
								return (
									<PasswordRequirement
										key={index}
										label={requirement.label}
										meets={requirement.regex.test(formValues.password)}
									/>
								);
							})}
						</Popover.Dropdown>
					</Popover>
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
						leftSection={<IconLock color="#D5D8DB" size={23} />}
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
