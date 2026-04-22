import { LinksModalView } from '@/pages/task-page/components/links-modal/links-modal.view.tsx';
import { useForm } from 'react-hook-form';
import { LINKS_FORM_INITIAL_VALUES } from '@/pages/task-page/constants.ts';
import type { ILinksForm } from '@/pages/task-page/types.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getModalTypeSelector } from '@/pages/task-page/selectors.ts';
import { setModalType } from '@/pages/task-page/slice.ts';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { useUpdateTaskMutation } from '@/api/tasks/tasks.api.ts';
import { useTaskData } from '@/pages/task-page/hooks.ts';
import { useEffect } from 'react';

const LinksModal = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const modalType = useAppSelector(getModalTypeSelector());

	const [updateTask] = useUpdateTaskMutation();
	const { task } = useTaskData(params.uuid);

	const form = useForm<ILinksForm>({
		defaultValues: LINKS_FORM_INITIAL_VALUES,
	});

	const handleSubmitForm = form.handleSubmit(async (values) => {
		if (!params.uuid) return;

		try {
			await updateTask({ fields: values, uuid: params.uuid }).unwrap();
			handleModalClose();
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	const handleModalClose = () => {
		dispatch(setModalType(null));
	};

	useEffect(() => {
		if (!task) return;

		form.reset({
			...(task?.mrLinks ? { mrLinks: task?.mrLinks.join('\n') } : {}),
			...(task?.buildLinks ? { buildLinks: task?.buildLinks.join('\n') } : {}),
		});
	}, [task?.id]);

	return (
		<LinksModalView form={form} modalType={modalType} onSubmit={handleSubmitForm} onModalClose={handleModalClose} />
	);
};

export { LinksModal };
