import './styles.less';
import React from 'react';
import type { IProjectErrors, IProjectFormValues } from '../../types.ts';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { CALENDAR_SETTINGS } from '../../contsants.ts';
import 'dayjs/locale/ru';
import { CustomModal } from '@/components/common/custom-modal.tsx';
import { CustomInput } from '@/components/common/custom-input.tsx';
import { CustomTextarea } from '@/components/common/custom-textarea.tsx';
import { CustomMultiSelect } from '@/components/common/custom-multi-select.tsx';
import { Button } from '@/components/ui/button.tsx';
import { DateInput } from '@/components/common/date-input.tsx';

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
	onSelectFieldChange: (name: string, value: Array<string> | string) => void;
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
			<form className="create-project-modal__form" onSubmit={onFormSubmit}>
				<div className="create-project-modal__field">
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
				<div className="create-project-modal__field">
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
				<div className="create-project-modal__field">
					<DatesProvider settings={CALENDAR_SETTINGS}>
						<DateInput
							label="Дедлайн"
							placeholder="Выберите дату"
							description="Дата окончания проекта"
							name="deadlineDate"
							value={formValues.deadlineDate}
							onChange={(value) => {
								if (!value) return;
								onSelectFieldChange('deadlineDate', value);
							}}
						/>
					</DatesProvider>
				</div>
				<div className="create-project-modal__field">
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
