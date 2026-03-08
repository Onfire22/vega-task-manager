export type DictionaryKey = 'taskPriority' | 'roleType' | 'stackType' | 'taskStatus';

export interface IInitialState {
	isModalShown: boolean;
}

export type TOption = { label: string; value: string };

export interface IExpDictData {
	color: string;
	id: string;
	name: string;
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	description: string;
	estimatedTime: string | null;
	loggedTime: string | null;
	assignee: string | null;
	reporter: string;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
	updatedAt: string;
}
