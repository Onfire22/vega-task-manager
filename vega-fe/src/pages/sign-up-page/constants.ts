export const SIGNUP_DEFAULT_VALUES = {
	email: '',
	password: '',
	passwordRepeat: '',
	name: '',
	secondName: '',
};

export const PASSWORD_REQUIREMENTS = [
	{ regex: /[0-9]/, label: 'Должен содержать цифру' },
	{ regex: /^.{8,}$/, label: 'Минимальная длина пароля 8 символов' },
	{ regex: /[a-z]/, label: 'Должен содержать строчную букву' },
	{ regex: /[A-Z]/, label: 'Должен содержать прописную букву' },
	{ regex: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Хотя бы один спец. символ' },
];

export const RED_COLOR = 'bg-danger';

export const TEAL_COLOR = 'bg-teal';

export const YELLOW_COLOR = 'bg-amber';

export const MINIMAL_PASSWORD_LENGTH = 7;
