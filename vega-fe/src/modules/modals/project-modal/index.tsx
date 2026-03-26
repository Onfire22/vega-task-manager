import React from 'react';
import { ProjectModalView } from './project-modal-view';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { useCreateProjectMutation } from '../../../api/queries/projects.api.ts';
import { getActiveModalSelector } from '../selectors.ts';
import { useUsersOptions } from '../../../api/hooks.ts';
import { PROJECT_FORM_INITIAL_VALUES } from '../contsants.ts';
import { CreateProjectValidationSchema } from '../validation.ts';
import { setActiveModal } from '../slice.ts';
import { useGetCurrentUserQuery } from '../../../api/queries/auth.api.ts';
import { toast } from 'sonner';

const ProjectModal = () => {
	const dispatch = useAppDispatch();

	const activeModal = useAppSelector(getActiveModalSelector());

	const { data } = useGetCurrentUserQuery();
	const [createProject] = useCreateProjectMutation();
	const { usersListOptions, isUsersLoading } = useUsersOptions({
		filters: { ...(data?.currentUser ? { withoutUser: data.currentUser.id } : {}) },
	});

	const formik = useFormik({
		initialValues: PROJECT_FORM_INITIAL_VALUES,
		validationSchema: CreateProjectValidationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			const response = await createProject(values);
			if (response?.data?.project) {
				toast.success('Проект успешно создан');
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

	const handleSelectFieldChange = (name: string, value: Array<string> | string | Date) => {
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
