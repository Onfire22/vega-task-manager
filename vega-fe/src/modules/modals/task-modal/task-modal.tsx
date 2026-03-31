import { TaskModalView } from './task-modal.view.tsx';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { useCreateTaskMutation } from '../../../api/queries/tasks.api.ts';
import { useDictionariesOptions, useProjectsOptions } from '../../../api/hooks.ts';
import { BASE_DICTIONARIES_META, TASK_FORM_INITIAL_VALUES } from '../contsants.ts';
import { getActiveModalSelector } from '../selectors.ts';
import { setActiveModal } from '../slice.ts';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import type { TTaskFormValues } from '@/modules/modals/types.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTaskValidationSchema } from '@/modules/modals/validation.ts';

const TaskModal = () => {
	const dispatch = useAppDispatch();

	const [createTask] = useCreateTaskMutation();

	const { projectOptions } = useProjectsOptions();
	const { dictionariesOptions, isDictionariesLoading } = useDictionariesOptions(BASE_DICTIONARIES_META);

	const activeModal = useAppSelector(getActiveModalSelector());

	const form = useForm<TTaskFormValues>({
		defaultValues: TASK_FORM_INITIAL_VALUES,
		resolver: zodResolver(CreateTaskValidationSchema),
	});

	const handleSubmitForm = form.handleSubmit(async (values) => {
		try {
			await createTask(values).unwrap();
			toast.success('Задача успешно создана');
			dispatch(setActiveModal(null));
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	const handleModalClose = () => {
		dispatch(setActiveModal(null));
	};

	return (
		<TaskModalView
			form={form}
			taskPrioritiesData={dictionariesOptions.taskPriority}
			stackListData={dictionariesOptions.taskType}
			activeModal={activeModal}
			projectOptions={projectOptions}
			isDictionariesLoading={isDictionariesLoading}
			onModalClose={handleModalClose}
			onFormSubmit={handleSubmitForm}
		/>
	);
};

export { TaskModal };
