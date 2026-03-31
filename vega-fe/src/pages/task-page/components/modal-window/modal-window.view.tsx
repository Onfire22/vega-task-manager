import React from 'react';
import { CustomModal } from '@/components/common/ui/custom-modal.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomTextarea } from '@/components/common/forms/custom-textarea.tsx';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { TFormOptions } from '@/pages/task-page/types.ts';

interface IProps {
	onLogWorkModalShown: () => void;
	onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	isModalShown: boolean;
	estimateTime?: string;
	form: UseFormReturn<TFormOptions>;
}

const ModalWindowView: React.FC<IProps> = ({ onLogWorkModalShown, isModalShown, onSubmit, estimateTime, form }) => {
	return (
		<CustomModal title="Учет времени" isOpen={isModalShown} onOpenChange={onLogWorkModalShown} size="lg">
			<form className="flex flex-col items-center gap-2.5" onSubmit={onSubmit}>
				<div className="w-full">
					<Controller
						name="estimate"
						control={form.control}
						render={({ field, fieldState }) => (
							<CustomInput
								id="estimate"
								type="text"
								label="Оценка задачи"
								placeholder="Формат времени: 1h 30m"
								value={field.value ?? ''}
								onChange={field.onChange}
								error={fieldState.error?.message}
								disabled={Boolean(estimateTime)}
							/>
						)}
					/>
				</div>
				<div className="w-full">
					<Controller
						name="loggedTime"
						control={form.control}
						render={({ field, fieldState }) => (
							<CustomInput
								id="loggedTime"
								type="text"
								label="Затраченное время"
								placeholder="Формат времени: 1h 30m"
								value={field.value ?? ''}
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						)}
					/>
				</div>
				<div className="w-full">
					<Controller
						name="logComment"
						control={form.control}
						render={({ field, fieldState }) => (
							<CustomTextarea
								label="Комментарий"
								placeholder="Описание проделанной работы"
								value={field.value ?? ''}
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						)}
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
