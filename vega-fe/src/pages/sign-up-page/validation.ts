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
	passwordRepeat: yup
		.string()
		.oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
		.required('Это обязательное поле'),
	name: yup
		.string()
		.matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Только русские или английские буквы')
		.required('Это обязательное поле'),
	surname: yup
		.string()
		.matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Только русские или английские буквы')
		.required('Это обязательное поле'),
});
