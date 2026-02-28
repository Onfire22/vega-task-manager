import React from 'react';
import { TaskModalView } from './task-modal-view';
import { setActiveModal } from '../../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { getActiveModalSelector } from '../../selectors.ts';
import { useFormik } from 'formik';
import { CreateTaskValidationSchema } from '../../validation.ts';
import { INITIAL_VALUES } from '../../constants.ts';
import { useCreateTaskMutation } from '../../../../api/queries/tasks.api.ts';
import { setNotification } from '../../../../components/notifications/slice.ts';
import { useDictionaries } from '../../../../shared/hooks.ts';

const TaskModal = () => {
	const dispatch = useAppDispatch();

	const [createTask] = useCreateTaskMutation();

	const { selectorsData } = useDictionaries(true);

	const activeModal = useAppSelector(getActiveModalSelector());

	const formik = useFormik({
		initialValues: INITIAL_VALUES,
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
			taskPrioritiesData={selectorsData?.priorities}
			stackListData={selectorsData?.stackTypes}
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
