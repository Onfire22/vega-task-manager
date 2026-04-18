import { z } from 'zod';
import { GetMessagesValidationSchema } from '@/api/messages/messages.validation.ts';

export type GetMessagesResponse = z.infer<typeof GetMessagesValidationSchema>;
