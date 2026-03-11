import { Button, Modal, Textarea, TextInput } from '@mantine/core';
import React from 'react';
import './styles.less';

interface IProps {
	formValues: {
		estimate: string;
		loggedTime: string;
		logComment: string;
	};
	formErrors: {
		estimate?: string;
		loggedTime?: string;
		logComment?: string;
	};
	onFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName?: string): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName?: string): void;
	};
	onLogWorkModalShown: () => void;
	onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	isModalShown: boolean;
	estimateTime?: string;
}

const ModalWindowView: React.FC<IProps> = ({
	formValues,
	formErrors,
	onFieldChange,
	onLogWorkModalShown,
	isModalShown,
	onSubmit,
	estimateTime,
}) => {
	return (
		<Modal opened={isModalShown} onClose={onLogWorkModalShown} title="Учет времени">
			<form className="modal-window" onSubmit={onSubmit}>
				<div className="modal-window__field">
					<TextInput
						id="estimate"
						type="text"
						label="Оценка задачи"
						name="estimate"
						placeholder="Формат времени: 1h 30m"
						value={formValues.estimate}
						error={formErrors.estimate}
						disabled={Boolean(estimateTime)}
						onChange={onFieldChange}
					/>
				</div>
				<div className="modal-window__field">
					<TextInput
						id="loggedTime"
						type="text"
						label="Затраченное время"
						name="loggedTime"
						placeholder="Формат времени: 1h 30m"
						value={formValues.loggedTime}
						error={formErrors.loggedTime}
						onChange={onFieldChange}
					/>
				</div>
				<div className="modal-window__field">
					<Textarea
						label="Комментарий"
						resize="vertical"
						name="description"
						description="Описание проделанной работы"
						value={formValues.logComment}
						error={formErrors?.logComment}
						onChange={onFieldChange}
					/>
				</div>
				<Button type="submit">Учесть время</Button>
			</form>
		</Modal>
	);
};

export { ModalWindowView };
