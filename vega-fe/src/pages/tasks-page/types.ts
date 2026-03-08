export interface IInitialState {
	activeTab: TActiveTab;
	isAssignee: boolean;
	sorting: {
		column: string;
		direction: 'asc' | 'desc';
	};
}

export type TActiveTab = 'table' | 'kanban';

export interface ITask {
	assigneeUuid: string | null;
	code: string | null;
	createdAt: string;
	description: string;
	estimatedTime: string | null;
	id: string;
	loggedTime: string | null;
	taskPriorityUuid: string | null;
	projectUuid: string | null;
	reporterUuid: string;
	taskStackUuid: string;
	taskStatusUuid: string;
	title: string;
	updatedAt: string;
}

export type TDictionariesTypes = 'taskPriority' | 'roleType' | 'stackType' | 'taskStatus';

export interface IDictionary {
	id: string;
	name: string;
	color: string | null;
	fullName: string | null;
}

export type IDict = Record<TDictionariesTypes, IDictionary[]>;

export interface ITaskTableData {
	assigneeUuid: string | null;
	code: string | null;
	createdAt: string;
	description: string;
	estimatedTime: string | null;
	id: string;
	loggedTime: string | null;
	taskPriorityUuid: {
		name: string;
		color: string;
	};
	projectUuid: string | null;
	reporterUuid: string;
	title: string;
	updatedAt: string;
	taskStatusUuid: {
		name: string;
		color: string;
	};
	taskStackUuid: {
		name: string;
		color: string;
	};
}
