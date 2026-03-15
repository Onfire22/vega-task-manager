export interface IInitialState {
	activeTab: string | null;
	isAssignee: boolean;
	sorting: {
		column: string;
		direction: 'asc' | 'desc';
	};
	filters: IFilters;
}

export interface IFilters {
	taskPriority: Record<string, boolean>;
	taskStatus: Record<string, boolean>;
	taskType: Record<string, boolean>;
}

export type TFilter = 'taskPriority' | 'taskStatus' | 'taskType';

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
