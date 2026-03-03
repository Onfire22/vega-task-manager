export interface ILocals {
	user: {
		id: string;
		iat: number;
		exp: number;
	};
}

export interface IDefaultResponse {
	success: boolean;
}
