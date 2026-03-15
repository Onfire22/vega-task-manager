export interface IInitialState {
	activeTab: string;
	isAssignee: boolean;
	sorting: {
		column: string;
		direction: 'asc' | 'desc';
	};
}

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

export interface IOptionType {
	label: string;
	value: string;
}

export interface IDictionaries {
	taskPriority: Array<IOptionType>;
	taskStatus: Array<IOptionType>;
	taskType: Array<IOptionType>;
}
