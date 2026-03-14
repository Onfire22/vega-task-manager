export interface IInitialState {
	activeModal: TActiveModal;
}

export type TActiveModal = 'project' | 'task' | null;

export type ITaskFormErrors = Partial<ITaskFormValues>;

export interface ITaskFormValues {
	title: string;
	description: string;
	taskStackUuid: string;
	taskPriorityUuid: string;
	taskProjectUuid: string;
}
export interface ISelectType {
	value: string;
	label: string;
}

export interface IProjectFormValues {
	title: string;
	description: string;
	usersUuids: string[];
	deadLine?: string;
}

export interface IProjectErrors {
	title?: string;
	description?: string;
	usersUuids?: string | string[] | never[];
}
