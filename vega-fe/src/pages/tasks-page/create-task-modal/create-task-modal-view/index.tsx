import { Button, Modal, Select, Textarea, TextInput } from '@mantine/core';
import './styles.less';
import React from 'react';
import type { IDictionaryItem } from '../../../../api/types.ts';
import type { IFormErrors, IFormValues } from '../../types.ts';

interface IProps {
	isModalShown: boolean;
	onModalClose: () => void;
	onFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName?: string): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName?: string): void;
	};
	onSelectFieldChange: (name: string, value: string) => void;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	stackListData?: IDictionaryItem[];
	taskPrioritiesData?: IDictionaryItem[];
	formValues: IFormValues;
	formErrors: IFormErrors;
}

const CreateTaskModalView: React.FC<IProps> = ({
	onModalClose,
	onFieldChange,
	onSelectFieldChange,
	onFormSubmit,
	isModalShown,
	stackListData,
	taskPrioritiesData,
	formValues,
	formErrors,
}) => {
	return (
		<Modal opened={isModalShown} onClose={onModalClose} size="100%" title="Создать задачу">
			<form className="create-task-modal__form" onSubmit={onFormSubmit}>
				<div className="create-task-modal__field">
					<TextInput
						label="Название"
						placeholder="Исправить ошибку на странице..."
						name="title"
						description="Краткое описание задачи"
						value={formValues.title}
						onChange={onFieldChange}
						error={formErrors?.title}
					/>
				</div>
				<div className="create-task-modal__field">
					<Textarea
						label="Описание"
						resize="vertical"
						name="description"
						description="Подробное описание задачи"
						value={formValues.description}
						onChange={onFieldChange}
						error={formErrors?.description}
					/>
				</div>
				<div className="create-task-modal__field">
					<Select
						label="Стек технологий"
						placeholder="Выберите значение"
						name="stackUuid"
						description="Для какой команды задача"
						data={stackListData}
						value={formValues.stackUuid}
						onChange={(value) => {
							if (value) {
								onSelectFieldChange('stackUuid', value);
							}
						}}
						error={formErrors?.stackUuid}
					/>
				</div>
				<div className="create-task-modal__field">
					<Select
						label="Приоритет задачи"
						placeholder="Выберите значение"
						name="priorityUuid"
						description="Критичность задачи"
						data={taskPrioritiesData}
						value={formValues.priorityUuid}
						onChange={(value) => {
							if (value) {
								onSelectFieldChange('priorityUuid', value);
							}
						}}
						error={formErrors?.priorityUuid}
					/>
				</div>
				<Button variant="filled" type="submit">
					Создать
				</Button>
			</form>
		</Modal>
	);
};

export { CreateTaskModalView };
