import React from 'react';
import { CreateTaskModalView } from './create-task-modal-view';
import { setIsModalShown } from '../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { getIsModalShownSelector } from '../selectors.ts';
import { useFormik } from 'formik';
import { CreateTaskValidationSchema } from '../validation.ts';
import { INITIAL_VALUES } from '../constants.ts';
import { useCreateTaskMutation } from '../../../api/queries/tasks.api.ts';
import { setNotification } from '../../../components/notifications/slice.ts';
import { useDictionaries } from '../hooks.ts';

const CreateTaskModal = () => {
	const dispatch = useAppDispatch();

	const [createTask] = useCreateTaskMutation();

	const { selectorsData } = useDictionaries();

	const isModalShown = useAppSelector(getIsModalShownSelector());

	const formik = useFormik({
		initialValues: INITIAL_VALUES,
		validationSchema: CreateTaskValidationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			const response = await createTask(values);
			if (response?.data?.success) {
				dispatch(setNotification({ type: 'success', text: 'Задача успешно создана' }));
				dispatch(setIsModalShown(false));
			}
		},
	});

	const handleModalClose = () => {
		dispatch(setIsModalShown(false));
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
		<CreateTaskModalView
			isModalShown={isModalShown}
			taskPrioritiesData={selectorsData?.priorities}
			stackListData={selectorsData?.stackTypes}
			formValues={formik.values}
			formErrors={formik.errors}
			onModalClose={handleModalClose}
			onFieldChange={handleFieldChange}
			onSelectFieldChange={handleSelectFieldChange}
			onFormSubmit={formik.handleSubmit}
		/>
	);
};

export { CreateTaskModal };
