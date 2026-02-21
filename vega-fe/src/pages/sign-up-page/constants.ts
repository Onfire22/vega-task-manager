export const SIGNUP_DEFAULT_VALUES = {
	email: '',
	password: '',
	passwordRepeat: '',
	name: '',
	secondName: '',
};

export const VALIDATION_MESSAGES = {
	required: 'Это обязательное поле',
	email: 'Некорректный email',
	lettersOnly: 'Только русские или английские буквы',
	passwordRepeat: 'Пароли должны совпадать',
	passwordLength: 'Минимальная длина пароля 8 символов',
};

export const PASSWORD_REQUIREMENTS = [
	{ regex: /[0-9]/, label: 'Должен содержать цифру' },
	{ regex: /[a-z]/, label: 'Должен содержать строчную букву' },
	{ regex: /[A-Z]/, label: 'Должен содержать прописную букву' },
	{ regex: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Хотя бы один спец. символ' },
];

export const RED_COLOR = '#fa5252';

export const TEAL_COLOR = '#12b886';

export const YELLOW_COLOR = '#fab005';

export const MINIMAL_PASSWORD_LENGTH = 7;
