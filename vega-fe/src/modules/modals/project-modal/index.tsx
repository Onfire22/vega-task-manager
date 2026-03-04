import React from 'react';
import { ProjectModalView } from './project-modal-view';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { useCreateProjectMutation } from '../../../api/queries/projects.api.ts';
import { getActiveModalSelector } from '../selectors.ts';
import { useUsersOptions } from '../../../api/hooks.ts';
import { PROJECT_FORM_INITIAL_VALUES } from '../contsants.ts';
import { CreateProjectValidationSchema } from '../validation.ts';
import { setNotification } from '../../notifications/slice.ts';
import { setActiveModal } from '../slice.ts';

const ProjectModal = () => {
	const dispatch = useAppDispatch();

	const [createProject] = useCreateProjectMutation();

	const activeModal = useAppSelector(getActiveModalSelector());

	const { usersListOptions, isUsersLoading } = useUsersOptions();

	const formik = useFormik({
		initialValues: PROJECT_FORM_INITIAL_VALUES,
		validationSchema: CreateProjectValidationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			const response = await createProject(values);
			if (response?.data?.success) {
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
