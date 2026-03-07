import { ModalWindowView } from './modal-window-view';
import { useFormik } from 'formik';
import { LOG_TIME_INITIAL_VALUES } from '../constants.ts';
import { LogTimeFormValidation } from '../validation.ts';
import React from 'react';
import { setIsModalShown } from '../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { getIsModalShownSelector } from '../selectors.ts';

const ModalWindow = () => {
	const dispatch = useAppDispatch();

	const isModalShown = useAppSelector(getIsModalShownSelector());

	const formik = useFormik({
		initialValues: LOG_TIME_INITIAL_VALUES,
		validationSchema: LogTimeFormValidation,
		validateOnChange: false,
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
			isModalShown={isModalShown}
			onSubmit={formik.handleSubmit}
			onFieldChange={handleFieldChange}
			onLogWorkModalShown={handleLogWorkModalShown}
		/>
	);
};

export { ModalWindow };
