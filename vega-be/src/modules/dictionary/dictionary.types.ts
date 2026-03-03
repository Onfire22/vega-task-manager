export interface IDictionary {
	id: string;
	name: string;
	color: string | null;
	fullName: string | null;
}

export interface IDictionaryReqQuery {
	filters: string;
}

export type TDictionariesTypes = 'task_priority:' | 'task_status' | 'stack_type' | 'role_type';

export type TPayload = Record<TDictionariesTypes, IDictionary[]>;

export interface IDictionaryResponse {
	dictionaries: Partial<TPayload>;
}
