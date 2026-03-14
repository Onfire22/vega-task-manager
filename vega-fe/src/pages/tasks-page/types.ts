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
	id: string;
	label: string;
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	description: string;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
}

export type TTaskList = Array<ITask>;

export interface IKanbanTasks extends IExpDictData {
	tasks: TTaskList;
}
