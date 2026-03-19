export type DictionaryKey = 'taskPriority' | 'taskType' | 'taskStatus';

export interface IInitialState {
	isModalShown: boolean;
}

export type TOption = { description: string; key: string; label: string; value: string };

export interface IExpDictData {
	id: string;
	label: string;
	key: string;
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
	remainingPercents: number;
	loggedPercents: number;
	project: {
		code: string;
		id: string;
	};
	timeLogs: Array<ITimeLog>;
	reporter: string;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
	updatedAt: string;
}

export interface IComment {
	id: string;
	user: {
		name: string;
		userUuid: string;
	};
	text: string;
	commentDate: string;
}
