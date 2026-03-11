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
	loggedTime: string;
	createdAt: string;
	updatedAt: string;
	user: {
		id: string;
		name: string;
		secondName: string;
	};
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	assignee: string | null;
	description: string;
	estimateTime: string;
	remainingTime: string;
	totalLoggedTime: string;
	estimateTimeInSecs: number;
	remainingPercents: number | null;
	loggedPercents: number | null;
	timeLogs: Array<ITimeLog>;
	reporter: string;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
	updatedAt: string;
}
