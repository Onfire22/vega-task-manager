import { ModalWindowView } from './modal-window.view.tsx';
import { LOG_TIME_INITIAL_VALUES } from '../../constants.ts';
import { LogTimeFormValidation } from '../../validation.ts';
import { setIsModalShown } from '../../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { getIsModalShownSelector } from '../../selectors.ts';
import { useTaskData } from '../../hooks.ts';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { TFormOptions } from '@/pages/task-page/types.ts';
import { zodResolver } from '@hookform/resolvers/zod';

const ModalWindow = () => {
	const dispatch = useAppDispatch();
	const params = useParams();

	const { task } = useTaskData(params.uuid);

	const isModalShown = useAppSelector(getIsModalShownSelector());

	const form = useForm<TFormOptions>({
		defaultValues: { ...LOG_TIME_INITIAL_VALUES, estimate: task?.estimateTime || '' },
		resolver: zodResolver(LogTimeFormValidation),
	});

	const handleSubmitForm = form.handleSubmit(async (values) => {
		console.log(values);
	});

	const handleLogWorkModalShown = () => {
		dispatch(setIsModalShown(false));
	};

	return (
		<ModalWindowView
			form={form}
			estimateTime={task?.estimateTime}
			isModalShown={isModalShown}
			onSubmit={handleSubmitForm}
			onLogWorkModalShown={handleLogWorkModalShown}
		/>
	);
};

export { ModalWindow };
