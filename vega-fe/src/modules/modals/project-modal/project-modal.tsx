import { ProjectModalView } from './project-modal.view.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { useCreateProjectMutation } from '@/api/projects/projects.api.ts';
import { getActiveModalSelector } from '../selectors.ts';
import { PROJECT_FORM_INITIAL_VALUES } from '../contsants.ts';
import { CreateProjectValidationSchema } from '../validation.ts';
import { setActiveModal } from '../slice.ts';
import { useGetCurrentUserQuery } from '@/api/auth/auth.api.ts';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import type { TProjectValues } from '@/modules/modals/types.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useUsersOptions } from '@/api/users/users.hooks.ts';

const ProjectModal = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const activeModal = useAppSelector(getActiveModalSelector());

	const { data } = useGetCurrentUserQuery();
	const [createProject] = useCreateProjectMutation();
	const { usersListOptions, isUsersLoading } = useUsersOptions({
		filters: { ...(data?.currentUser ? { withoutUser: data.currentUser.id } : {}) },
	});

	const form = useForm<TProjectValues>({
		defaultValues: PROJECT_FORM_INITIAL_VALUES,
		resolver: zodResolver(CreateProjectValidationSchema),
	});

	const handleSubmitForm = form.handleSubmit(async (values) => {
		try {
			const response = await createProject(values).unwrap();
			toast.success('Проект успешно создана');
			form.reset();
			dispatch(setActiveModal(null));
			navigate(`project/${response.id}`);
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	const handleModalClose = () => {
		dispatch(setActiveModal(null));
	};

	return (
		<ProjectModalView
			form={form}
			activeModal={activeModal}
			userList={usersListOptions}
			isLoading={isUsersLoading}
			onFormSubmit={handleSubmitForm}
			onModalClose={handleModalClose}
		/>
	);
};

export { ProjectModal };
