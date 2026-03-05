export interface InitialState {
	activeStep: number;
}

export interface IRequirement {
	regex: RegExp;
	label: string;
}

export type DictionaryKey = 'lowerCaseLetters' | 'upperCaseLetters' | 'symbols' | 'numbers';
