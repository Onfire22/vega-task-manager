import { ModalWindowView } from './modal-window-view';
import { useFormik } from 'formik';
import { LOG_TIME_INITIAL_VALUES } from '../constants.ts';
import { LogTimeFormValidation } from '../validation.ts';
import React from 'react';
import { setIsModalShown } from '../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { getIsModalShownSelector } from '../selectors.ts';
import { useTaskData } from '../hooks.ts';
import { useParams } from 'react-router-dom';

const ModalWindow = () => {
	const dispatch = useAppDispatch();
	const params = useParams();

	const { task } = useTaskData(params.uuid);

	const isModalShown = useAppSelector(getIsModalShownSelector());

	const formik = useFormik({
		initialValues: { ...LOG_TIME_INITIAL_VALUES, estimate: task?.estimateTime || '' },
		validationSchema: LogTimeFormValidation,
		validateOnChange: false,
		enableReinitialize: true,
		onSubmit: async (values) => {
			console.log(values);
		},
	});

	const handleFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>): void;
	} = (e) => {
		const { name } = e.target;
		formik.setFieldError(name, '');
		formik.handleChange(e);
	};

	const handleLogWorkModalShown = () => {
		dispatch(setIsModalShown(false));
	};

	return (
		<ModalWindowView
			formValues={formik.values}
			formErrors={formik.errors}
			estimateTime={task?.estimateTime}
			isModalShown={isModalShown}
			onSubmit={formik.handleSubmit}
			onFieldChange={handleFieldChange}
			onLogWorkModalShown={handleLogWorkModalShown}
		/>
	);
};

export { ModalWindow };
