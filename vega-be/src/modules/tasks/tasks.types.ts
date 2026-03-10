export interface ICreateTaskBody {
	title: string;
	description: string;
	taskStackUuid: string;
	taskPriorityUuid: string;
}

export type TDirection = 'desc' | 'asc';

export interface ISorting {
	column: string;
	direction: TDirection;
}

export interface ITimeLog {
	id: string;
	description: string | null;
	loggedTime: number | null;
	user: {
		id: string;
		name: string;
		secondName: string | null;
	};
	createdAt: Date;
	updatedAt?: Date;
}

export interface IGetUserTasksBody {
	isAssignee: false;
	sorting: ISorting;
}

export interface IExpDictData {
	color?: string | null;
	id: string;
	name: string;
}

export interface IExpUserDict {
	id: string;
	name: string;
	secondName: string | null;
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	description: string;
	estimateTime: number | null;
	timeLogs: Array<ITimeLog>;
	assignee: IExpUserDict | null;
	reporter: IExpUserDict;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGetTaskParams {
	uuid: string;
}

export type TUpdateTaskFields = 'title' | 'stackType' | 'taskPriority' | 'taskStatus' | 'assignee' | 'description';

export type TUpdateTask = {
	fieldName: TUpdateTaskFields;
	value: string;
};

export interface IEstimateTaskTimeBody {
	estimateTime?: string;
	loggedTime?: string;
	description?: string;
}

export interface ITime {
	hours: string;
	minutes: string;
}

export type ITaskTransformed = Omit<ITask, 'estimateTime' | 'timeLogs'> & {
	estimateTime: Partial<ITime> | null;
	timeLogs: Array<
		Omit<ITimeLog, 'loggedTime'> & {
			loggedTime: Partial<ITime> | null;
		}
	>;
};
