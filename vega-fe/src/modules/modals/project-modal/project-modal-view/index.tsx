import './styles.less';
import { Button, Loader, Modal, MultiSelect, Textarea, TextInput } from '@mantine/core';
import React from 'react';
import type { IProjectErrors, IProjectFormValues } from '../../types.ts';

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
	onSelectFieldChange: (name: string, value: string[]) => void;
}

const ProjectModalView: React.FC<IProps> = ({
	formValues,
	formErrors,
	onFieldChange,
	onFormSubmit,
	activeModal,
	onModalClose,
	userList,
	isLoading,
	onSelectFieldChange,
}) => {
	return (
		<Modal opened={activeModal === 'project'} onClose={onModalClose} size="50%" title="Создать проект">
			<form className="create-project-modal__form" onSubmit={onFormSubmit}>
				<div className="create-project-modal__field">
					<TextInput
						label="Название"
						placeholder="Название проекта"
						name="title"
						description="Название проекта"
						value={formValues.title}
						error={formErrors?.title}
						onChange={onFieldChange}
						withAsterisk
					/>
				</div>
				<div className="create-project-modal__field">
					<Textarea
						label="Описание"
						resize="vertical"
						name="description"
						description="Подробное описание проекта"
						value={formValues.description}
						error={formErrors?.description}
						onChange={onFieldChange}
						withAsterisk
					/>
				</div>
				<div className="create-project-modal__field">
					<MultiSelect
						label="Пользователи"
						placeholder="Выберите пользователей"
						description="Список участников проекта"
						name="usersUuids"
						data={userList}
						value={formValues.usersUuids}
						onChange={(value) => {
							if (value) {
								onSelectFieldChange('usersUuids', value);
							}
						}}
						rightSection={isLoading && <Loader size="xs" />}
						clearable
					/>
				</div>
				<Button variant="filled" type="submit">
					Создать
				</Button>
			</form>
		</Modal>
	);
};

export { ProjectModalView };
