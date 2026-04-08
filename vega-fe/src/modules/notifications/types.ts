export interface INotification {
	id: string;
	isReaded: boolean;
	createdAt: string;
	extraData?: string;
	entity: {
		uuid?: string;
		type: 'TASK' | 'TASK_STATUS' | 'PROJECT';
		code?: string;
	};
	user: {
		userName: string;
	};
}

export interface IInitialState {
	notifications: Array<INotification>;
}
