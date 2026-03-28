import React from 'react';
import type { ISelectType, TTaskFormValues } from '../../types.ts';
import { CustomModal } from '@/components/common/ui/custom-modal.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomTextarea } from '@/components/common/forms/custom-textarea.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { Controller, type UseFormReturn } from 'react-hook-form';

interface IProps {
	form: UseFormReturn<TTaskFormValues>;
	onModalClose: () => void;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	stackListData: ISelectType[];
	taskPrioritiesData: ISelectType[];
	projectOptions: Array<{ label: string; value: string }>;
	activeModal: 'project' | 'task' | null;
	isDictionariesLoading: boolean;
}

const TaskModalView: React.FC<IProps> = ({
	onModalClose,
	onFormSubmit,
	activeModal,
	stackListData,
	taskPrioritiesData,
	projectOptions,
	isDictionariesLoading,
	form,
}) => {
	return isDictionariesLoading ? (
		<CustomLoader />
	) : (
		<CustomModal isOpen={activeModal === 'task'} onOpenChange={onModalClose} title="Создать задачу">
			<form className="flex flex-col items-center gap-2.5" onSubmit={onFormSubmit}>
				<div className="w-full">
					<Controller
						name="title"
						control={form.control}
						render={({ field, fieldState }) => (
							<CustomInput
								type="text"
								label="Название"
								placeholder="Исправить ошибку на странице..."
								description="Краткое описание задачи"
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								isRequired
							/>
						)}
					/>
				</div>
				<div className="w-full">
					<Controller
						name="description"
						control={form.control}
						render={({ field, fieldState }) => (
							<CustomTextarea
								label="Описание"
								description="Подробное описание задачи"
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								isRequired
							/>
						)}
					/>
				</div>
				<div className="w-full">
					<Controller
						name="taskStackUuid"
						control={form.control}
						render={({ field, fieldState }) => (
							<CustomSelect
								label="Стек технологий"
								placeholder="Выберите значение"
								name="taskStackUuid"
								description="Для какой команды задача"
								options={stackListData}
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								isRequired
							/>
						)}
					/>
				</div>
				<div className="w-full">
					<Controller
						name="taskPriorityUuid"
						control={form.control}
						render={({ field, fieldState }) => (
							<CustomSelect
								label="Приоритет задачи"
								placeholder="Выберите значение"
								description="Критичность задачи"
								options={taskPrioritiesData}
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								isRequired
							/>
						)}
					/>
				</div>
				<div className="w-full">
					<Controller
						name="taskProjectUuid"
						control={form.control}
						render={({ field, fieldState }) => (
							<CustomSelect
								label="Проект"
								placeholder="Выберите значение"
								description="Проект в котором будет выполняться задача"
								options={projectOptions}
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								isRequired
							/>
						)}
					/>
				</div>
				<Button variant="primary" type="submit">
					Создать
				</Button>
			</form>
		</CustomModal>
	);
};

export { TaskModalView };
