import { PasswordInput, Popover, Progress, TextInput } from '@mantine/core';
import { AtSign, Lock } from 'lucide-react';
import { PasswordRequirement } from '../../password-requirement';
import { MINIMAL_PASSWORD_LENGTH, PASSWORD_REQUIREMENTS, VALIDATION_MESSAGES } from '../../../constants.ts';
import React from 'react';
import './styles.less';
import type { IFormErrors, IFormValues } from '../../../types.ts';

interface IProps {
	formValues: IFormValues;
	formErrors: IFormErrors;
	isPopoverOpened: boolean;
	passwordRef: React.RefObject<HTMLInputElement | null>;
	emailRef: React.RefObject<HTMLInputElement | null>;
	popoverData: { strength: number; color: string };
	onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onPopoverOpened: (value: boolean) => void;
	onGeneratePasswordClick: () => void;
}

const AccountStep: React.FC<IProps> = ({
	formValues,
	formErrors,
	isPopoverOpened,
	popoverData,
	onFieldChange,
	onPopoverOpened,
	onGeneratePasswordClick,
	passwordRef,
	emailRef,
}) => {
	return (
		<>
			<div className="account-step__input">
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
					leftSection={<AtSign color="#D5D8DB" size={21} />}
					ref={emailRef}
				/>
			</div>
			<div className="account-step__input account-step__input_random">
				<a className="account-step__generator" onClick={onGeneratePasswordClick}>
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
						<div onFocusCapture={() => onPopoverOpened(true)} onBlurCapture={() => onPopoverOpened(false)}>
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
								leftSection={<Lock color="#D5D8DB" size={21} />}
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
			<div className="account-step__input">
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
					leftSection={<Lock color="#D5D8DB" size={21} />}
				/>
			</div>
		</>
	);
};

export { AccountStep };
