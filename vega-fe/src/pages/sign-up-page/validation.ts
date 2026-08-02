import { z } from 'zod';
import { PASSWORD_REQUIREMENTS } from './constants.ts';

const PasswordSchema = PASSWORD_REQUIREMENTS.reduce(
	(schema, requirement) => schema.refine((val) => requirement.regex.test(val), { message: requirement.label }),
	z.string().min(1, 'Это обязательное поле').min(8, 'Минимальная длина пароля 8 символов'),
);

export const AccountStepValidationSchema = z
	.object({
		email: z.email('Некорректный email'),
		password: PasswordSchema,
		passwordRepeat: z.string().min(1, 'Это обязательное поле'),
	})
	.refine((data) => data.password === data.passwordRepeat, {
		message: 'Пароли должны совпадать',
		path: ['passwordRepeat'],
	});

export const ProfileStepValidationSchema = z.object({
	name: z
		.string()
		.min(1, 'Это обязательное поле')
		.regex(/^[A-Za-zА-Яа-яЁё]+$/, 'Только русские или английские буквы'),
	secondName: z
		.string()
		.min(1, 'Это обязательное поле')
		.regex(/^[A-Za-zА-Яа-яЁё]+$/, 'Только русские или английские буквы'),
});

export const SignUpSchema = z.object({
	...AccountStepValidationSchema.shape,
	...ProfileStepValidationSchema.shape,
});
