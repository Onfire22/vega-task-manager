import React from 'react';
import type { TProjectValues } from '../types.ts';
import { CustomModal } from '@/components/common/ui/custom-modal.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomTextarea } from '@/components/common/forms/custom-textarea.tsx';
import { CustomMultiSelect } from '@/components/common/forms/custom-multi-select.tsx';
import { Button } from '@/components/ui/button.tsx';
import { DateInput } from '@/components/common/forms/date-input.tsx';
import { Controller, type UseFormReturn } from 'react-hook-form';

interface IProps {
	form: UseFormReturn<TProjectValues>;
	activeModal: 'project' | 'task' | null;
	userList: { label: string; value: string }[];
	isLoading: boolean;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	onModalClose: () => void;
}

const ProjectModalView: React.FC<IProps> = ({ onFormSubmit, activeModal, onModalClose, userList, form }) => {
	return (
		<CustomModal isOpen={activeModal === 'project'} onOpenChange={onModalClose} title="Создать проект">
			<form className="flex flex-col items-center gap-2.5" onSubmit={onFormSubmit}>
				<div className="w-full">
					<Controller
						name="title"
						control={form.control}
						render={({ field, fieldState }) => (
							<CustomInput
								type="text"
								label="Название"
								placeholder="Название проекта"
								description="Название проекта"
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								isRequired
							/>
						)}
					/>
				</div>
				<div className="w-full">
					<Controller
						name="description"
						control={form.control}
						render={({ field, fieldState }) => (
							<CustomTextarea
								label="Описание"
								description="Подробное описание проекта"
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								isRequired
							/>
						)}
					/>
				</div>
				<div className="w-full">
					<Controller
						name="deadlineDate"
						control={form.control}
						render={({ field }) => (
							<DateInput
								label="Дедлайн"
								description="Дата сдачи проекта"
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</div>
				<div className="w-full">
					<Controller
						name="usersUuids"
						control={form.control}
						render={({ field }) => (
							<CustomMultiSelect
								label="Пользователи"
								placeholder="Выберите пользователей"
								description="Список участников проекта"
								options={userList}
								values={field.value ?? []}
								setValues={field.onChange}
							/>
						)}
					/>
				</div>
				<Button variant="primary" type="submit">
					Создать
				</Button>
			</form>
		</CustomModal>
	);
};

export { ProjectModalView };
