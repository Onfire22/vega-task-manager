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
import { useEffect } from 'react';
import { useUpdateTaskEstimateMutation } from '@/api/queries/tasks.api.ts';
import { toast } from 'sonner';
import { useCreateTaskLogMutation } from '@/api/queries/task-logs.ts';

const ModalWindow = () => {
	const dispatch = useAppDispatch();
	const params = useParams();

	const { task } = useTaskData(params.uuid);
	const [updateTaskEstimate] = useUpdateTaskEstimateMutation();
	const [createTaskLog] = useCreateTaskLogMutation();

	const isModalShown = useAppSelector(getIsModalShownSelector());

	const form = useForm<TFormOptions>({
		defaultValues: LOG_TIME_INITIAL_VALUES,
		resolver: zodResolver(LogTimeFormValidation),
	});

	const handleSubmitForm = form.handleSubmit(async (values) => {
		console.log(values);
		if (!values.estimate) return;
		try {
			const isLogValue = values.loggedTime && values.estimate === task?.estimateTime;

			if (isLogValue) {
				await createTaskLog({ ...values, taskUuid: params.uuid! }).unwrap();
			} else {
				await updateTaskEstimate({ value: values.estimate, uuid: params.uuid! }).unwrap();
			}
			dispatch(setIsModalShown(false));
			toast.success(isLogValue ? 'Время успешно записано' : 'Задача успешно оценена');
		} catch (e: unknown) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	const handleLogWorkModalShown = () => {
		dispatch(setIsModalShown(false));
	};

	useEffect(() => {
		if (task?.estimateTime) {
			form.setValue('estimate', task?.estimateTime);
		}
	}, [task?.estimateTime, form]);

	console.log(form.getValues());
	console.log(task);

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
