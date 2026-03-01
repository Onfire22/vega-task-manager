import React from 'react';
import { TaskModalView } from './task-modal-view';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks.ts';
import { useCreateTaskMutation } from '../../../../../api/queries/tasks.api.ts';
import { useDictionariesOptions } from '../../../../../api/hooks.ts';
import { getActiveModalShownSelector } from '../../../selectors.ts';
import { setNotification } from '../../../../../components/notifications/slice.ts';
import { setActiveModal } from '../../../slice.ts';
import { BASE_DICTIONARIES_META, TASK_FORM_INITIAL_VALUES } from '../../../contsants.ts';
import { CreateTaskValidationSchema } from '../../../validation.ts';

const TaskModal = () => {
	const dispatch = useAppDispatch();

	const [createTask] = useCreateTaskMutation();

	const { dictionariesOptions } = useDictionariesOptions(BASE_DICTIONARIES_META);

	const activeModal = useAppSelector(getActiveModalShownSelector());

	const formik = useFormik({
		initialValues: TASK_FORM_INITIAL_VALUES,
		validationSchema: CreateTaskValidationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			const response = await createTask(values);
			if (response?.data?.newTask) {
				dispatch(setNotification({ type: 'success', text: 'Задача успешно создана' }));
				dispatch(setActiveModal(null));
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
			taskPrioritiesData={dictionariesOptions?.task_priority}
			stackListData={dictionariesOptions?.stack_type}
			formValues={formik.values}
			formErrors={formik.errors}
			activeModal={activeModal}
			onModalClose={handleModalClose}
			onFieldChange={handleFieldChange}
			onSelectFieldChange={handleSelectFieldChange}
			onFormSubmit={formik.handleSubmit}
		/>
	);
};

export { TaskModal };
