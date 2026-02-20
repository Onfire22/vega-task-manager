export type FormType = 'signup' | 'info';

export interface InitialState {
	activeForm: FormType;
}

export interface IUserData {
	email: string;
	password: string;
	name: string;
	secondName: string;
}
