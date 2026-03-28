import { z } from 'zod';

export const SignUpValidationSchema = z.object({
	email: z.email('Некорректный email'),
	password: z.string().min(1, 'Это обязательное поле'),
});
