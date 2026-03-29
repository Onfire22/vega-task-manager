import { z } from 'zod';
import { DictionariesQuerySchema } from './dictionary.validation';

export interface IDictionary {
	id: string;
	label: string;
	description: string | null;
}

export interface IDictionaryReqQuery {
	filters: string;
}

export type TDictionariesTypes =
	| 'task_priority'
	| 'role_type'
	| 'task_status'
	| 'user_specialisation'
	| 'task_type'
	| 'project_status'
	| 'project_type';

export type TPayload = Record<TDictionariesTypes, Array<IDictionary>>;

export interface IDictionaryResponse {
	dictionaries: Partial<Record<'taskPriority' | 'roleType' | 'stackType' | 'taskStatus', IDictionary[]>>;
}

export type TDictionaries = z.infer<typeof DictionariesQuerySchema>;
