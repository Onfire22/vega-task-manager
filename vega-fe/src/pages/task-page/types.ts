export type DictionaryKey = 'taskPriority' | 'roleType' | 'stackType' | 'taskStatus';

export interface IInitialState {
	isModalShown: boolean;
}

export type TOption = { label: string; value: string };

export type TDictField = { name: string; color?: string | null };

export interface ITask {
	title: string;
	description: string;
	taskPriorityUuid: TDictField;
	taskStackUuid: TDictField;
	id: string;
	code: string | null;
	estimatedTime: string | null;
	loggedTime: string | null;
	assigneeUuid: string | null;
	reporterUuid: string;
	projectUuid: string | null;
	taskStatusUuid: TDictField;
	createdAt: string;
	updatedAt: string;
}
