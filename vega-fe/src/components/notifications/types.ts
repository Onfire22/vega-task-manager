export interface IInitialState {
	notification: INotification | null;
}

export interface INotification {
	type: 'success' | 'warning' | 'error';
	text: string;
	message?: string;
}
