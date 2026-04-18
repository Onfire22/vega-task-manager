import { z } from 'zod';

export const CreateChannelValidationSchema = z.object({
	title: z.string().min(1, 'Это обязательное поле').max(25, 'Максимум 25 символов'),
	channelVisibility: z.string().min(1, 'Это обязательное поле'),
	usersList: z.array(z.string()).optional(),
});
