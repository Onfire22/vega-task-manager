import { z } from 'zod';
import { CreateTaskTimeBodySchema, getTaskLogsPramsSchema } from './task-logs.validation';

export type TCreateTaskTimeBody = z.infer<typeof CreateTaskTimeBodySchema>;

export type TGetTaskLogsPrams = z.infer<typeof getTaskLogsPramsSchema>;
