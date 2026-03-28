import { z } from 'zod';

export const PersonalSchema = z.object({
	name: z.string().nonempty('Это обязательное поле'),
	secondName: z.string().nonempty('Это обязательное поле'),
	userName: z.string().nonempty('Это обязательное поле'),
	userSpecialisationUuid: z.string().nonempty('Это обязательное поле'),
});

export const PasswordSchema = z
	.object({
		currentPassword: z.string().nonempty('Это обязательное поле'),
		newPassword: z.string().nonempty('Это обязательное поле'),
		newPasswordRepeat: z.string().nonempty('Это обязательное поле'),
	})
	.refine((data) => data.newPassword === data.newPasswordRepeat, {
		message: 'Пароли должны совпадать',
		path: ['newPasswordRepeat'],
	});
