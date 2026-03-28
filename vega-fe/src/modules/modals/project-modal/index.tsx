import { ProjectModalView } from './project-modal-view';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { useCreateProjectMutation } from '../../../api/queries/projects.api.ts';
import { getActiveModalSelector } from '../selectors.ts';
import { useUsersOptions } from '../../../api/hooks.ts';
import { PROJECT_FORM_INITIAL_VALUES } from '../contsants.ts';
import { CreateProjectValidationSchema } from '../validation.ts';
import { setActiveModal } from '../slice.ts';
import { useGetCurrentUserQuery } from '../../../api/queries/auth.api.ts';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import type { TProjectValues } from '@/modules/modals/types.ts';
import { zodResolver } from '@hookform/resolvers/zod';

const ProjectModal = () => {
	const dispatch = useAppDispatch();

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
			await createProject(values).unwrap();
			toast.success('Проект успешно создана');
			dispatch(setActiveModal(null));
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
