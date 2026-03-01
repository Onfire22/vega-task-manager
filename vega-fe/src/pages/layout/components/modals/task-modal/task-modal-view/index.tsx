import { Button, Modal, Select, Textarea, TextInput } from '@mantine/core';
import './styles.less';
import React from 'react';
import type { ITaskFormErrors, ITaskFormValues, ISelectType } from '../../../../types.ts';

interface IProps {
	onModalClose: () => void;
	onFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName?: string): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName?: string): void;
	};
	onSelectFieldChange: (name: string, value: string) => void;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	stackListData?: ISelectType[];
	taskPrioritiesData?: ISelectType[];
	formValues: ITaskFormValues;
	formErrors: ITaskFormErrors;
	activeModal: 'project' | 'task' | null;
}

const TaskModalView: React.FC<IProps> = ({
	onModalClose,
	onFieldChange,
	onSelectFieldChange,
	onFormSubmit,
	activeModal,
	stackListData,
	taskPrioritiesData,
	formValues,
	formErrors,
}) => {
	return (
		<Modal opened={activeModal === 'task'} onClose={onModalClose} size="100%" title="Создать задачу">
			<form className="task-modal__form" onSubmit={onFormSubmit}>
				<div className="task-modal__field">
					<TextInput
						label="Название"
						placeholder="Исправить ошибку на странице..."
						name="title"
						description="Краткое описание задачи"
						value={formValues.title}
						onChange={onFieldChange}
						error={formErrors?.title}
						withAsterisk
					/>
				</div>
				<div className="task-modal__field">
					<Textarea
						label="Описание"
						resize="vertical"
						name="description"
						description="Подробное описание задачи"
						value={formValues.description}
						onChange={onFieldChange}
						error={formErrors?.description}
						withAsterisk
					/>
				</div>
				<div className="task-modal__field">
					<Select
						label="Стек технологий"
						placeholder="Выберите значение"
						name="taskStackUuid"
						description="Для какой команды задача"
						data={stackListData}
						value={formValues.taskStackUuid}
						onChange={(value) => {
							if (value) {
								onSelectFieldChange('taskStackUuid', value);
							}
						}}
						error={formErrors?.taskStackUuid}
						withAsterisk
					/>
				</div>
				<div className="task-modal__field">
					<Select
						label="Приоритет задачи"
						placeholder="Выберите значение"
						name="taskPriorityUuid"
						description="Критичность задачи"
						data={taskPrioritiesData}
						value={formValues.taskPriorityUuid}
						onChange={(value) => {
							if (value) {
								onSelectFieldChange('taskPriorityUuid', value);
							}
						}}
						error={formErrors?.taskPriorityUuid}
						withAsterisk
					/>
				</div>
				<Button variant="filled" type="submit">
					Создать
				</Button>
			</form>
		</Modal>
	);
};

export { TaskModalView };
