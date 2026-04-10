import { AtSign, Lock } from 'lucide-react';
import React from 'react';
import type { IFormValues, TSignUpFormValues } from '../../types.ts';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomPasswordInput } from '@/components/common/forms/custom-password-input.tsx';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { PasswordRequirements } from '@/components/common/forms/password-requirements.tsx';
import { PASSWORD_REQUIREMENTS } from '@/pages/sign-up-page/constants.ts';

interface IProps {
	form: UseFormReturn<TSignUpFormValues>;
	formValues: IFormValues;
	isPopoverOpened: boolean;
	passwordRef: React.RefObject<HTMLInputElement | null>;
	emailRef: React.RefObject<HTMLInputElement | null>;
	popoverData: { strength: number; color: string };
	onPopoverOpened: (value: boolean) => void;
	onGeneratePasswordClick: () => void;
}

const AccountStep: React.FC<IProps> = ({
	formValues,
	isPopoverOpened,
	popoverData,
	onPopoverOpened,
	onGeneratePasswordClick,
	passwordRef,
	emailRef,
	form,
}) => {
	return (
		<>
			<div className="relative min-h-16.5 mb-2.5">
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
							ref={emailRef}
							isRequired
						/>
					)}
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
									leftIcon={<Lock color="#D5D8DB" size={21} />}
									ref={passwordRef}
									isRequired
								/>
							)}
						/>
					}
				>
					<PasswordRequirements
						requirements={PASSWORD_REQUIREMENTS}
						password={formValues.password}
						strength={popoverData.strength}
						color={popoverData.color}
					/>
				</CustomPopover>
			</div>
			<div className="relative min-h-16.5 mb-2.5">
				<Controller
					name="passwordRepeat"
					control={form.control}
					render={({ field, fieldState }) => (
						<CustomPasswordInput
							id="password-repeat"
							type="password"
							label="Повторите пароль"
							placeholder="********"
							value={field.value}
							onChange={field.onChange}
							error={fieldState.error?.message}
							leftIcon={<Lock color="#D5D8DB" size={21} />}
							isRequired
						/>
					)}
				/>
			</div>
		</>
	);
};

export { AccountStep };
