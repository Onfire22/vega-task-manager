export interface IInitialState {
	activeTab: string;
	isAssignee: boolean;
	sorting: {
		column: string;
		direction: 'asc' | 'desc';
	};
	filters: IFilters;
	pagination: { pageLimit: number; page: number };
}

export interface IFilters {
	taskPriorityUuid: Record<string, boolean>;
	taskStatusUuid: Record<string, boolean>;
	taskStackUuid: Record<string, boolean>;
}

export type TFilter = 'taskPriorityUuid' | 'taskStatusUuid' | 'taskStackUuid';

export interface IExpDictData {
	id: string;
	label: string;
	key: string;
}

interface ITimeEntry {
	time: string;
	timeInPercents: number;
}

interface ILogInfo {
	estimateTime?: ITimeEntry;
	remainingTime?: ITimeEntry;
	totalLoggedTime?: ITimeEntry;
}

export interface ITask {
	id: string;
	code: string;
	title: string;
	description: string;
	assignee: string | null;
	reporter: string;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
	updatedAt: string;
	logInfo: ILogInfo;
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

export interface IPagination {
	pages: Array<number | null>;
	activePage: number;
	hasNext: boolean;
	hasPrev: boolean;
	totalPages: number;
}
