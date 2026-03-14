import React from 'react';
import { TaskModalView } from './task-modal-view';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { useCreateTaskMutation } from '../../../api/queries/tasks.api.ts';
import { useDictionariesOptions, useProjectsOptions } from '../../../api/hooks.ts';
import { setNotification } from '../../notifications/slice.ts';
import { BASE_DICTIONARIES_META, TASK_FORM_INITIAL_VALUES } from '../contsants.ts';
import { getActiveModalSelector } from '../selectors.ts';
import { CreateTaskValidationSchema } from '../validation.ts';
import { setActiveModal } from '../slice.ts';

const TaskModal = () => {
	const dispatch = useAppDispatch();

	const [createTask] = useCreateTaskMutation();

	const { projectOptions } = useProjectsOptions();
	const { dictionariesOptions } = useDictionariesOptions(BASE_DICTIONARIES_META);

	const activeModal = useAppSelector(getActiveModalSelector());

	const formik = useFormik({
		initialValues: TASK_FORM_INITIAL_VALUES,
		validationSchema: CreateTaskValidationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			try {
				await createTask(values).unwrap();
				dispatch(setNotification({ type: 'success', text: 'Задача успешно создана' }));
				dispatch(setActiveModal(null));
			} catch (e) {
				const error = e as { data?: { message?: string } };
				dispatch(
					setNotification({
						type: 'error',
						text: error.data?.message ?? 'Something went wrong',
					}),
				);
			}
		},
	});

	const handleModalClose = () => {
		dispatch(setActiveModal(null));
	};

	const handleFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>): void;
	} = (e) => {
		const { name } = e.target;
		formik.setFieldError(name, '');
		formik.handleChange(e);
	};

	const handleSelectFieldChange = (name: string, value: string) => {
		formik.setFieldError(name, '');
		formik.setFieldValue(name, value);
	};

	return (
		<TaskModalView
			taskPrioritiesData={dictionariesOptions?.taskPriority}
			stackListData={dictionariesOptions?.taskType}
			formValues={formik.values}
			formErrors={formik.errors}
			activeModal={activeModal}
			projectOptions={projectOptions}
			onModalClose={handleModalClose}
			onFieldChange={handleFieldChange}
			onSelectFieldChange={handleSelectFieldChange}
			onFormSubmit={formik.handleSubmit}
		/>
	);
};

export { TaskModal };
