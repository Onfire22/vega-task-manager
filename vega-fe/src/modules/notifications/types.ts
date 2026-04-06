export interface INotification {
	id: string;
	entity: {
		uuid: string;
		type: string;
		code: string;
	};
	user: {
		userName: string;
	};
	isReaded: boolean;
}

export interface IInitialState {
	notifications: Array<INotification>;
}
