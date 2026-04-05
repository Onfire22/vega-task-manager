import { z } from 'zod';
import type { GetTaskLogsResponseSchema } from '@/api/task-logs/task-logs.validation.ts';

export type TGetTaskLogsResponse = z.infer<typeof GetTaskLogsResponseSchema>;
