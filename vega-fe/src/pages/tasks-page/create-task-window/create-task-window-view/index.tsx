import { Button, Modal, Select, Textarea, TextInput } from '@mantine/core';
import './styles.less';
import React from 'react';
import type { IDictionary } from '../../types.ts';

interface IProps {
	isModalShown: boolean;
	onModalClose: () => void;
	dictionaries: { stackList?: IDictionary[]; taskPriorities?: IDictionary[] };
}

const CreateTaskWindowView: React.FC<IProps> = ({ isModalShown, onModalClose, dictionaries }) => {
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
					<Select label="Стек технологий" placeholder="Pick value" data={dictionaries.stackList} />
				</div>
				<div className="create-task-modal__field">
					<Select label="Приоритет задачи" placeholder="Pick value" data={dictionaries.taskPriorities} />
				</div>
				<Button variant="filled">Создать</Button>
			</form>
		</Modal>
	);
};

export { CreateTaskWindowView };
