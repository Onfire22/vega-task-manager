export interface IInitialState {
	isModalShown: boolean;
}

export interface IDictionary {
	value: string;
	label: string;
}

export interface IFormValues {
	title: string;
	description: string;
	stackUuid: string;
	priorityUuid: string;
}

export type IFormErrors = Partial<IFormValues>;
