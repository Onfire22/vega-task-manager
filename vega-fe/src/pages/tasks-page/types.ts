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
