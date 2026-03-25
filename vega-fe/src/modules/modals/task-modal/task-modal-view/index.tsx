import React from 'react';
import type { ISelectType, ITaskFormErrors, ITaskFormValues } from '../../types.ts';
import { CustomModal } from '@/components/common/custom-modal.tsx';
import { CustomInput } from '@/components/common/custom-input.tsx';
import { CustomTextarea } from '@/components/common/custom-textarea.tsx';
import { CustomSelect } from '@/components/common/custom-select.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomLoader } from '@/components/common/custom-loader.tsx';

interface IProps {
	onModalClose: () => void;
	onFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName?: string): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName?: string): void;
	};
	onSelectFieldChange: (name: string, value: string) => void;
	onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	stackListData: ISelectType[];
	taskPrioritiesData: ISelectType[];
	projectOptions: ISelectType[];
	formValues: ITaskFormValues;
	formErrors: ITaskFormErrors;
	activeModal: 'project' | 'task' | null;
	isDictionariesLoading: boolean;
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
	projectOptions,
	isDictionariesLoading,
}) => {
	return isDictionariesLoading ? (
		<CustomLoader />
	) : (
		<CustomModal isOpen={activeModal === 'task'} onOpenChange={onModalClose} title="Создать задачу">
			<form className="flex flex-col items-center gap-2.5" onSubmit={onFormSubmit}>
				<div className="w-full">
					<CustomInput
						type="text"
						label="Название"
						placeholder="Исправить ошибку на странице..."
						name="title"
						description="Краткое описание задачи"
						value={formValues.title}
						onChange={onFieldChange}
						error={formErrors?.title}
						isRequired
					/>
				</div>
				<div className="w-full">
					<CustomTextarea
						label="Описание"
						name="description"
						description="Подробное описание задачи"
						value={formValues.description}
						onChange={onFieldChange}
						error={formErrors?.description}
						isRequired
					/>
				</div>
				<div className="w-full">
					<CustomSelect
						label="Стек технологий"
						placeholder="Выберите значение"
						name="taskStackUuid"
						description="Для какой команды задача"
						options={stackListData}
						value={formValues.taskStackUuid}
						onChange={(value) => {
							if (value) {
								onSelectFieldChange('taskStackUuid', value);
							}
						}}
						error={formErrors?.taskStackUuid}
						isRequired
					/>
				</div>
				<div className="w-full">
					<CustomSelect
						label="Приоритет задачи"
						placeholder="Выберите значение"
						name="taskPriorityUuid"
						description="Критичность задачи"
						options={taskPrioritiesData}
						value={formValues.taskPriorityUuid}
						onChange={(value) => {
							if (value) {
								onSelectFieldChange('taskPriorityUuid', value);
							}
						}}
						error={formErrors?.taskPriorityUuid}
						isRequired
					/>
				</div>
				<div className="w-full">
					<CustomSelect
						label="Проект"
						placeholder="Выберите значение"
						name="taskProjectUuid"
						description="Проект в котором будет выполняться задача"
						options={projectOptions}
						value={formValues.taskProjectUuid}
						onChange={(value) => {
							if (value) {
								onSelectFieldChange('taskProjectUuid', value);
							}
						}}
						error={formErrors?.taskProjectUuid}
						isRequired
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
