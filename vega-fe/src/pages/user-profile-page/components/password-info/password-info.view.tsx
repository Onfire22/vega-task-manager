import { CustomPasswordInput } from '@/components/common/forms/custom-password-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { IPasswordForm } from '@/pages/user-profile-page/types.ts';
import React from 'react';

interface IProps {
	formData: UseFormReturn<IPasswordForm>;
	isButtonDisabled: boolean;
	onSubmit: () => void;
}

const PasswordInfoView: React.FC<IProps> = ({ formData, onSubmit, isButtonDisabled }) => {
	return (
		<div className="bg-card rounded-lg">
			<form onSubmit={onSubmit}>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<div className="px-4.5 py-3.5">
						<p className="text-white">Настройки пароля</p>
						<p className="text-[12px] text-muted-foreground">Изменить пароль</p>
					</div>
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Старый пароль</p>
					<Controller
						name="currentPassword"
						control={formData.control}
						render={({ field, fieldState }) => (
							<CustomPasswordInput
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						)}
					/>
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Новый пароль</p>
					<Controller
						name="newPassword"
						control={formData.control}
						render={({ field, fieldState }) => (
							<CustomPasswordInput
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						)}
					/>
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Повторите пароль</p>
					<Controller
						name="newPasswordRepeat"
						control={formData.control}
						render={({ field, fieldState }) => (
							<CustomPasswordInput
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						)}
					/>
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75 py-2.5">
					<Button variant="primary" type="submit" disabled={isButtonDisabled}>
						Изменить пароль
					</Button>
				</div>
			</form>
		</div>
	);
};

export { PasswordInfoView };
