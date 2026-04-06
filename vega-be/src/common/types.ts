export interface ILocals {
	user: {
		id: string;
		iat: number;
		exp: number;
	};
}

declare module 'socket.io' {
	interface Socket {
		user: {
			id: string;
		};
	}
}
