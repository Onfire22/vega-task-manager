import React from 'react';
import { ProjectModalView } from './project-modal-view';
import { useFormik } from 'formik';
import { PROJECT_FORM_INITIAL_VALUES } from '../../../contsants.ts';
import { CreateProjectValidationSchema } from '../../../validation.ts';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks.ts';
import { getActiveModalShownSelector } from '../../../selectors.ts';
import { useUsersOptions } from '../../../../../api/hooks.ts';
import { setActiveModal } from '../../../slice.ts';
import { useCreateProjectMutation } from '../../../../../api/queries/projects.api.ts';
import { setNotification } from '../../../../../components/notifications/slice.ts';

const ProjectModal = () => {
	const dispatch = useAppDispatch();

	const [createProject] = useCreateProjectMutation();

	const activeModal = useAppSelector(getActiveModalShownSelector());

	const { usersListOptions, isUsersLoading } = useUsersOptions();

	const formik = useFormik({
		initialValues: PROJECT_FORM_INITIAL_VALUES,
		validationSchema: CreateProjectValidationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			const response = await createProject(values);
			if (response?.data?.newProject) {
				dispatch(setNotification({ type: 'success', text: 'Проект успешно создан' }));
				dispatch(setActiveModal(null));
			}
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

	const handleSelectFieldChange = (name: string, value: string[]) => {
		formik.setFieldError(name, '');
		formik.setFieldValue(name, value);
	};

	return (
		<ProjectModalView
			formValues={formik.values}
			formErrors={formik.errors}
			activeModal={activeModal}
			userList={usersListOptions}
			isLoading={isUsersLoading}
			onFieldChange={handleFieldChange}
			onFormSubmit={formik.handleSubmit}
			onModalClose={handleModalClose}
			onSelectFieldChange={handleSelectFieldChange}
		/>
	);
};

export { ProjectModal };
