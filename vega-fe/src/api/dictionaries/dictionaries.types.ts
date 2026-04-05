import { z } from 'zod';
import { DictionariesResponseSchema } from './dictionaries.validation';

export type TDictionariesTypes =
	| 'TASK_PRIORITY'
	| 'ROLE_TYPE'
	| 'USER_SPECIALISATION'
	| 'TASK_STATUS'
	| 'TASK_TYPE'
	| 'PROJECT_STATUS';

export type TDictionariesRequest = Array<TDictionariesTypes>;

export type TDictionariesResponse = z.infer<typeof DictionariesResponseSchema>;
