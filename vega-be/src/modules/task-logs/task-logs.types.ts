import { z } from 'zod';
import { TaskParamsSchema, UpdateTaskTimeBodySchema } from './task-logs.validation';

export type TUpdateTaskTimeBody = z.infer<typeof UpdateTaskTimeBodySchema>;

export type TTaskParams = z.infer<typeof TaskParamsSchema>;
