import React from 'react';
import type { IProjectErrors, IProjectFormValues } from '../../types.ts';
import { CustomModal } from '@/components/common/ui/custom-modal.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomTextarea } from '@/components/common/forms/custom-textarea.tsx';
import { CustomMultiSelect } from '@/components/common/forms/custom-multi-select.tsx';
import { Button } from '@/components/ui/button.tsx';
import { DateInput } from '@/components/common/forms/date-input.tsx';

interface IProps {
	formValues: IProjectFormValues;
	formErrors: IProjectErrors;
	activeModal: 'project' | 'task' | null;
	userList: { label: string; value: string }[];
	isLoading: boolean;
	onFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName?: string): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName?: string): void;
	};
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	onModalClose: () => void;
	onSelectFieldChange: (name: string, value: Array<string> | string | Date) => void;
}

const ProjectModalView: React.FC<IProps> = ({
	formValues,
	formErrors,
	onFieldChange,
	onFormSubmit,
	activeModal,
	onModalClose,
	userList,
	onSelectFieldChange,
}) => {
	return (
		<CustomModal isOpen={activeModal === 'project'} onOpenChange={onModalClose} title="Создать проект">
			<form className="flex flex-col items-center gap-2.5" onSubmit={onFormSubmit}>
				<div className="w-full">
					<CustomInput
						type="text"
						label="Название"
						placeholder="Название проекта"
						name="title"
						description="Название проекта"
						value={formValues.title}
						error={formErrors?.title}
						onChange={onFieldChange}
						isRequired
					/>
				</div>
				<div className="w-full">
					<CustomTextarea
						label="Описание"
						name="description"
						description="Подробное описание проекта"
						value={formValues.description}
						error={formErrors?.description}
						onChange={onFieldChange}
						isRequired
					/>
				</div>
				<div className="w-full">
					<DateInput
						label="Дедлайн"
						description="Дата сдачи проекта"
						value={formValues.deadlineDate}
						onChange={(value) => {
							if (!value) return;
							onSelectFieldChange('deadlineDate', value);
						}}
					/>
				</div>
				<div className="w-full">
					<CustomMultiSelect
						label="Пользователи"
						placeholder="Выберите пользователей"
						description="Список участников проекта"
						options={userList}
						values={formValues.usersUuids}
						setValues={(value) => {
							if (value) {
								onSelectFieldChange('usersUuids', value);
							}
						}}
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
