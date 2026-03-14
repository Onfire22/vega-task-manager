export interface InitialState {
	activeStep: number;
}

export interface IRequirement {
	regex: RegExp;
	label: string;
}

export type DictionaryKey = 'lowerCaseLetters' | 'upperCaseLetters' | 'symbols' | 'numbers';

export interface IFormValues {
	email: string;
	password: string;
	passwordRepeat: string;
	name: string;
	secondName: string;
	userSpecialisationUuid: string;
}

export interface IFormErrors {
	email?: string;
	password?: string;
	passwordRepeat?: string;
	name?: string;
	secondName?: string;
	userSpecialisationUuid?: string;
}

export interface IOptions {
	label: string;
	value: string;
}
