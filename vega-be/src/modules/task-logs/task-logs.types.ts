import { z } from 'zod';
import { CreateTaskTimeBodySchema } from './task-logs.validation';

export type TCreateTaskTimeBody = z.infer<typeof CreateTaskTimeBodySchema>;
