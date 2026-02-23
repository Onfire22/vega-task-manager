import React from 'react';
import { CreateTaskModalView } from './create-task-modal-view';
import { setIsModalShown } from '../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { getIsModalShownSelector } from '../selectors.ts';
import type { IDictionaryItem } from '../../../api/types.ts';
import { useFormik } from 'formik';
import { CreateTaskValidationSchema } from '../validation.ts';
import { INITIAL_VALUES } from '../constants.ts';
import { useCreateTaskMutation } from '../../../api/queries/tasks.api.ts';
import { setNotification } from '../../../components/notifications/slice.ts';

interface IProps {
	stackListData?: IDictionaryItem[];
	taskPrioritiesData?: IDictionaryItem[];
}

const CreateTaskModal: React.FC<IProps> = ({ taskPrioritiesData, stackListData }) => {
	const dispatch = useAppDispatch();

	const [createTask] = useCreateTaskMutation();

	const isModalShown = useAppSelector(getIsModalShownSelector());

	const formik = useFormik({
		initialValues: INITIAL_VALUES,
		validationSchema: CreateTaskValidationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			console.log(values);
			const response = await createTask(values);
			console.log(response);
			if (response?.data?.success) {
				dispatch(setNotification({ type: 'success', text: 'Задача успешно создана' }));
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
			taskPrioritiesData={taskPrioritiesData}
			stackListData={stackListData}
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
