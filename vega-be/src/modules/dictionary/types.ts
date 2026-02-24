export interface IDictionary {
	id: string;
	name: string;
	color: string | null;
	fullName: string | null;
}

export type TDictionariesTypes = 'task_priority:' | 'task_status' | 'stack_type';

export type TPayload = Record<TDictionariesTypes, IDictionary[]>;
