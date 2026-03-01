export interface IInitialState {
	activeModal: TActiveModal;
	isSidebarOpened: boolean;
}

export type TActiveModal = 'project' | 'task' | null;

export type ITaskFormErrors = Partial<ITaskFormValues>;

export interface ITaskFormValues {
	title: string;
	description: string;
	taskStackUuid: string;
	taskPriorityUuid: string;
}
export interface ISelectType {
	value: string;
	label: string;
}

export interface IProjectFormValues {
	title: string;
	description: string;
}

export type IProjectErrors = Partial<IProjectFormValues>;
