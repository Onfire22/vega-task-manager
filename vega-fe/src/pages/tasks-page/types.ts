export interface IInitialState {
	activeTab: TActiveTab;
	isAssignee: boolean;
	sorting: {
		column: string;
		direction: 'asc' | 'desc';
	};
}

export type TActiveTab = 'table' | 'kanban';

export interface IExpDictData {
	color?: string | null;
	id: string;
	name: string;
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	estimatedTime: string | null;
	loggedTime: string | null;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
}

export type TTaskList = Array<ITask>;
