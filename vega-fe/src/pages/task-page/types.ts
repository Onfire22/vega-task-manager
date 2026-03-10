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

export interface ITimeLog {
	description: string | null;
	id: string;
	loggedTime: Partial<{ minutes: string; hours: string }>;
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	assignee: string | null;
	description: string;
	estimateTime: string | null;
	timeLogs: Array<ITimeLog>;
	reporter: string;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
	updatedAt: string;
}
