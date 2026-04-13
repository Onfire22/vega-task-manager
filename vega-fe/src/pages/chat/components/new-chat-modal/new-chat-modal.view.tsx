import type { IUserOption, TCreateChannel, TNewChatModal } from '@/pages/chat/types.ts';
import React from 'react';
import { CustomModal } from '@/components/common/ui/custom-modal.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { CHANNEL_VISIBILITY } from '@/pages/chat/constants.ts';
import { CustomMultiSelect } from '@/components/common/forms/custom-multi-select.tsx';
import { SendHorizontal } from 'lucide-react';

interface IProps {
	modalType: TNewChatModal;
	value: string;
	onCloseModal: () => void;
	usersOptions: Array<IUserOption>;
	form: UseFormReturn<TCreateChannel>;
	onSubmitForm: (e: React.ChangeEvent<HTMLFormElement>) => void;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onPmChatStart: (user: IUserOption) => void;
}

const NewChatModalView: React.FC<IProps> = ({
	modalType,
	onCloseModal,
	form,
	onSubmitForm,
	onSearchChange,
	value,
	usersOptions,
	onPmChatStart,
}) => {
	return (
		<CustomModal
			size="sm"
			isOpen={Boolean(modalType)}
			onOpenChange={onCloseModal}
			title={modalType === 'channel' ? 'Создать канал' : 'Открыть личный чат'}
		>
			{modalType === 'channel' && (
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
			)}
			{modalType === 'pm' && (
				<div>
					<CustomInput value={value} onChange={onSearchChange} placeholder="Поиск пользователя" />
					<ul className="p-3 flex flex-col gap-2 max-h-125 overflow-auto scrollbar-custom">
						{usersOptions.length > 0 ? (
							usersOptions.map((item) => {
								return (
									<li className="py-2 flex items-center justify-between" key={item.value}>
										<span>{item.label}</span>
										<Button variant="primary" type="button" onClick={() => onPmChatStart(item)}>
											<SendHorizontal />
										</Button>
									</li>
								);
							})
						) : (
							<div className="text-center py-2">Ничего не найдено</div>
						)}
					</ul>
				</div>
			)}
		</CustomModal>
	);
};

export { NewChatModalView };
