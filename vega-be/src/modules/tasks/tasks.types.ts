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
	secondName: string;
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	description: string;
	estimatedTime: number | null;
	loggedTime: number | null;
	assignee: IExpUserDict | null;
	reporter: IExpUserDict;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: Date;
	updatedAt: Date;
}

export interface ITaskListResponse {
	tasks: Array<Omit<ITask, 'description' | 'assignee' | 'reporter' | 'updatedAt'>>;
}

export interface IGetTaskParams {
	uuid: string;
}

export type TUpdateTaskFields = 'title' | 'stackType' | 'taskPriority' | 'taskStatus' | 'assignee' | 'description';

export type TUpdateTask = {
	fieldName: TUpdateTaskFields;
	value: string;
};
