import { ModalWindowView } from './modal-window.view.tsx';
import { LOG_TIME_INITIAL_VALUES } from '../../constants.ts';
import { LogTimeFormValidation } from '../../validation.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getModalTypeSelector } from '../../selectors.ts';
import { useChartData } from '../../hooks.ts';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { TFormOptions } from '@/pages/task-page/types.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useUpdateTaskEstimateMutation } from '@/api/tasks/tasks.api.ts';
import { toast } from 'sonner';
import { useCreateTaskLogMutation } from '@/api/task-logs/task-logs.api.ts';
import { setModalType } from '@/pages/task-page/slice.ts';

const ModalWindow = () => {
	const dispatch = useAppDispatch();
	const params = useParams();

	const { chartData } = useChartData();
	const [updateTaskEstimate] = useUpdateTaskEstimateMutation();
	const [createTaskLog] = useCreateTaskLogMutation();

	const modalType = useAppSelector(getModalTypeSelector());

	const form = useForm<TFormOptions>({
		defaultValues: LOG_TIME_INITIAL_VALUES,
		resolver: zodResolver(LogTimeFormValidation),
	});

	const handleSubmitForm = form.handleSubmit(async (values) => {
		if (!values.estimate) return;
		try {
			if (chartData?.estimateTime) {
				await createTaskLog({ ...values, taskUuid: params.uuid! }).unwrap();
			} else {
				await updateTaskEstimate({ value: values.estimate, uuid: params.uuid! }).unwrap();
				await createTaskLog({ ...values, taskUuid: params.uuid! }).unwrap();
			}

			dispatch(setModalType(null));
			toast.success(chartData?.estimateTime ? 'Время успешно записано' : 'Задача успешно оценена');
		} catch (e: unknown) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
	});

	const handleLogWorkModalShown = () => {
		dispatch(setModalType(null));
	};

	useEffect(() => {
		if (chartData?.estimateTime) {
			form.setValue('estimate', chartData?.estimateTime);
		}
	}, [chartData?.estimateTime, form]);

	return (
		<ModalWindowView
			form={form}
			estimateTime={chartData?.estimateTime}
			modalType={modalType}
			onSubmit={handleSubmitForm}
			onLogWorkModalShown={handleLogWorkModalShown}
		/>
	);
};

export { ModalWindow };
