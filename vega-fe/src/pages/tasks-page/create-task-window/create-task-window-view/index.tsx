import { Button, Modal, Select, Textarea, TextInput } from '@mantine/core';
import './styles.less';
import React from 'react';
import type { IDictionaryItem } from '../../../../api/types.ts';

interface IProps {
	isModalShown: boolean;
	onModalClose: () => void;
	stackListData?: IDictionaryItem[];
	taskPrioritiesData?: IDictionaryItem[];
}

const CreateTaskWindowView: React.FC<IProps> = ({ isModalShown, onModalClose, stackListData, taskPrioritiesData }) => {
	return (
		<Modal opened={isModalShown} onClose={onModalClose} size="100%" title="Создать задачу">
			<form className="create-task-modal__form">
				<div className="create-task-modal__field">
					<TextInput label="Название" placeholder="Исправить ошибку на странице..." />
				</div>
				<div className="create-task-modal__field">
					<Textarea label="Описание" resize="vertical" />
				</div>
				<div className="create-task-modal__field">
					<Select label="Стек технологий" placeholder="Pick value" data={stackListData} />
				</div>
				<div className="create-task-modal__field">
					<Select label="Приоритет задачи" placeholder="Pick value" data={taskPrioritiesData} />
				</div>
				<Button variant="filled">Создать</Button>
			</form>
		</Modal>
	);
};

export { CreateTaskWindowView };
