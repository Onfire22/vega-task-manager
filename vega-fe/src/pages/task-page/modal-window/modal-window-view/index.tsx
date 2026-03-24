import React from 'react';
import { CustomModal } from '@/components/common/custom-modal.tsx';
import { CustomInput } from '@/components/common/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomTextarea } from '@/components/common/custom-textarea.tsx';

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
		<CustomModal title="Учет времени" isOpen={isModalShown} onOpenChange={onLogWorkModalShown} size="lg">
			<form className="flex flex-col items-center gap-2.5" onSubmit={onSubmit}>
				<div className="w-full">
					<CustomInput
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
				<div className="w-full">
					<CustomInput
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
				<div className="w-full">
					<CustomTextarea
						label="Комментарий"
						name="description"
						placeholder="Описание проделанной работы"
						value={formValues.logComment}
						error={formErrors?.logComment}
						onChange={onFieldChange}
					/>
				</div>
				<Button type="submit" variant="primary" size="lg">
					Учесть время
				</Button>
			</form>
		</CustomModal>
	);
};

export { ModalWindowView };
