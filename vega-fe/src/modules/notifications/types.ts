export interface INotification {
	id: string;
	isReaded: boolean;
	createdAt: string;
	entity: {
		uuid: string;
		type: string;
		code: string;
	};
	user: {
		userName: string;
	};
}

export interface IInitialState {
	notifications: Array<INotification>;
}
