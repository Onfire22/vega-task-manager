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

export interface ITask {
	assigneeUuid: string | null;
	code: string | null;
	createdAt: Date;
	description: string;
	estimatedTime: number | null;
	id: string;
	loggedTime: number | null;
	projectUuid: string | null;
	reporterUuid: string;
	taskPriorityUuid: string;
	taskStackUuid: string;
	taskStatusUuid: string;
	title: string;
	updatedAt: Date;
}

export interface ITasksResponse {
	tasks: Array<ITask>;
}

export interface IGetTaskParams {
	uuid: string;
}

export type TUpdateTask = Pick<
	ITask,
	'id' | 'title' | 'taskStackUuid' | 'taskPriorityUuid' | 'description' | 'assigneeUuid'
>;
