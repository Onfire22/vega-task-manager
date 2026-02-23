export interface IInitialState {
	isModalShown: boolean;
	activeTab: TActiveTab;
}

export interface IFormValues {
	title: string;
	description: string;
	stackUuid: string;
	priorityUuid: string;
}

export type IFormErrors = Partial<IFormValues>;

export type TActiveTab = 'table' | 'kanban';

export interface ITask {
	assigneeUuid: string | null;
	code: string | null;
	createdAt: string;
	description: string;
	estimatedTime: string | null;
	id: string;
	loggedTime: string | null;
	priorityUuid: string | null;
	projectUuid: string | null;
	reporterUuid: string;
	stackUuid: string;
	statusUuid: string;
	title: string;
	updatedAt: string;
}
