export interface ISignInReqBody {
	email: string;
	password: string;
}

export interface ISignUpReqBody {
	email: string;
	name: string;
	password: string;
	secondName: string;
}

export interface IAuthRes {
	user: {
		email: string;
		id: string;
		name: string;
		secondName: string | null;
	};
}

export interface ICookie {
	token: string;
}
