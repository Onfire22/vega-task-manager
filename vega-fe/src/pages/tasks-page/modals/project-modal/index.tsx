import { ProjectModalView } from './project-modal-view';
import { useFormik } from 'formik';
import { PROJECT_INITIAL_VALUES } from '../../constants.ts';
import { CreateProjectValidationSchema } from '../../validation.ts';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { getActiveModalSelector } from '../../selectors.ts';
import { setActiveModal } from '../../slice.ts';
import { useUsersData } from '../../hooks.ts';
// import { setNotification } from '../../../components/notifications/slice.ts';

const ProjectModal = () => {
	const dispatch = useAppDispatch();
	const activeModal = useAppSelector(getActiveModalSelector());
	const { userList, isLoading } = useUsersData();

	const formik = useFormik({
		initialValues: PROJECT_INITIAL_VALUES,
		validationSchema: CreateProjectValidationSchema,
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

	const handleModalClose = () => {
		dispatch(setActiveModal(null));
	};

	return (
		<ProjectModalView
			formValues={formik.values}
			formErrors={formik.errors}
			activeModal={activeModal}
			userList={userList}
			isLoading={isLoading}
			onFieldChange={handleFieldChange}
			onFormSubmit={formik.handleSubmit}
			onModalClose={handleModalClose}
		/>
	);
};

export { ProjectModal };
