import { Controller, type UseFormReturn } from 'react-hook-form';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { CHANNEL_VISIBILITY } from '@/pages/chat/constants.ts';
import { CustomMultiSelect } from '@/components/common/forms/custom-multi-select.tsx';
import { Button } from '@/components/ui/button.tsx';
import React from 'react';
import type { IUserOption, TCreateChannel } from '@/pages/chat/types.ts';

interface IProps {
	onCloseModal: () => void;
	usersOptions: Array<IUserOption>;
	form: UseFormReturn<TCreateChannel>;
	onSubmitForm: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const NewChannelContentView: React.FC<IProps> = ({ onSubmitForm, form, usersOptions, onCloseModal }) => {
	return (
		<form className="flex flex-col gap-3" onSubmit={onSubmitForm}>
			<Controller
				name="title"
				control={form.control}
				render={({ field, fieldState }) => (
					<CustomInput
						description="Наимеование канала*"
						value={field.value}
						onChange={field.onChange}
						error={fieldState.error?.message}
						isRequired
					/>
				)}
			/>
			<Controller
				name="channelVisibility"
				control={form.control}
				render={({ field, fieldState }) => (
					<CustomSelect
						description="Приватность канала*"
						options={CHANNEL_VISIBILITY}
						value={field.value}
						onChange={field.onChange}
						error={fieldState.error?.message}
						isRequired
					/>
				)}
			/>
			<Controller
				name="usersList"
				control={form.control}
				render={({ field }) => (
					<CustomMultiSelect
						label="Пользователи"
						placeholder="Выберите пользователей"
						description="Список участников чата"
						options={usersOptions}
						values={field.value ?? []}
						setValues={field.onChange}
					/>
				)}
			/>
			<div className="flex items-center justify-center gap-3">
				<Button variant="primary" type="submit">
					Создать
				</Button>
				<Button type="button" onClick={onCloseModal}>
					Отмена
				</Button>
			</div>
		</form>
	);
};

export { NewChannelContentView };
