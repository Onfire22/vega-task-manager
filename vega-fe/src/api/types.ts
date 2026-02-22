export interface IUserData {
	email: string;
	password: string;
	name: string;
	secondName: string;
}

export interface ISignInUserData {
	email: string;
	password: string;
}

export interface IBaseDictionary {
	id: string;
	name: string;
}

export interface IStack extends IBaseDictionary {
	fullName: string;
	color: string;
}
