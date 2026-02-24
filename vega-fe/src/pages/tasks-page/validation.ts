import * as yup from 'yup';

export const CreateTaskValidationSchema = yup.object().shape({
	title: yup.string().min(5, 'Минимум 5 символов').required('Это обязательное поле'),
	description: yup.string().min(5, 'Минимум 5 символов').required('Это обязательное поле'),
	taskStackUuid: yup.string().required('Это обязательное поле'),
	taskPriorityUuid: yup.string().required('Это обязательное поле'),
});
