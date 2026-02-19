import * as yup from 'yup';

export const SignUpValidationSchema = yup.object().shape({
	email: yup
		.string()
		.email('Некорректный email')
		.required('Это обязательное поле'),
	password: yup
		.string()
		.min(8, 'Пароль должен быть как минимум 8 символов')
		.matches(
			/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
			'Пароль должен содержать хотя бы одну заглавную букву и один спецсимвол',
		)
		.required('Это обязательное поле'),
});
