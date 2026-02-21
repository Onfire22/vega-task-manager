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

export interface IRequirement {
	regex: RegExp;
	label: string;
}

export type DictionaryKey = 'lowerCaseLetters' | 'upperCaseLetters' | 'symbols' | 'numbers';
