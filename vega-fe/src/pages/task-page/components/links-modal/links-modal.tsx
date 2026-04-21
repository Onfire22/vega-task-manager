import { LinksModalView } from '@/pages/task-page/components/links-modal/links-modal.view.tsx';
import { useForm } from 'react-hook-form';
import { LINKS_FORM_INITIAL_VALUES } from '@/pages/task-page/constants.ts';
import type { ILinksForm } from '@/pages/task-page/types.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getModalTypeSelector } from '@/pages/task-page/selectors.ts';
import { setModalType } from '@/pages/task-page/slice.ts';

const LinksModal = () => {
	const dispatch = useAppDispatch();
	const modalType = useAppSelector(getModalTypeSelector());

	const form = useForm<ILinksForm>({
		defaultValues: LINKS_FORM_INITIAL_VALUES,
	});

	const handleSubmitForm = form.handleSubmit(async (values) => {
		console.log(values);
	});

	const handleLogWorkModalShown = () => {
		dispatch(setModalType(null));
	};

	return (
		<LinksModalView
			form={form}
			modalType={modalType}
			onSubmit={handleSubmitForm}
			onLogWorkModalShown={handleLogWorkModalShown}
		/>
	);
};

export { LinksModal };
