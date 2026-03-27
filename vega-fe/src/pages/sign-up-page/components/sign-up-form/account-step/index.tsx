import { AtSign, Lock } from 'lucide-react';
import { PasswordRequirement } from '../../password-requirement';
import { MINIMAL_PASSWORD_LENGTH, PASSWORD_REQUIREMENTS, VALIDATION_MESSAGES } from '../../../constants.ts';
import React from 'react';
import type { IFormErrors, IFormValues } from '../../../types.ts';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomPasswordInput } from '@/components/common/forms/custom-password-input.tsx';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { CustomProgress } from '@/components/common/ui/custom-progress.tsx';

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
			<div className="relative min-h-16.5 mb-2.5">
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
					ref={emailRef}
					isRequired
				/>
			</div>
			<div className="relative min-h-16.5 mb-2.5">
				<a className="absolute link-styled right-0 top-0.75 text-[12px]" onClick={onGeneratePasswordClick}>
					generate random
				</a>
				<CustomPopover
					width="438px"
					isOpen={isPopoverOpened}
					setIsOpened={onPopoverOpened}
					trigger={
						<div>
							<CustomPasswordInput
								id="password"
								type="password"
								label="Пароль"
								name="password"
								placeholder="********"
								value={formValues.password}
								error={formErrors.password}
								onChange={onFieldChange}
								leftIcon={<Lock color="#D5D8DB" size={21} />}
								ref={passwordRef}
								isRequired
							/>
						</div>
					}
					content={
						<>
							<CustomProgress color={popoverData.color} progress={popoverData.strength} />
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
						</>
					}
				/>
			</div>
			<div className="relative min-h-16.5 mb-2.5">
				<CustomPasswordInput
					id="password-repeat"
					type="password"
					label="Повторите пароль"
					name="passwordRepeat"
					placeholder="********"
					value={formValues.passwordRepeat}
					error={formErrors.passwordRepeat}
					onChange={onFieldChange}
					leftIcon={<Lock color="#D5D8DB" size={21} />}
					isRequired
				/>
			</div>
		</>
	);
};

export { AccountStep };
