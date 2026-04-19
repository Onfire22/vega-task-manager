export const FORM_DEFAULT_VALUES = {
	title: '',
	channelVisibility: 'PUBLIC',
	usersList: [],
};

export const CHANNEL_VISIBILITY = [
	{
		label: 'Публичный',
		value: 'PUBLIC',
	},
	{
		label: 'Приватный',
		value: 'PRIVATE',
	},
];

export const USER_COlORS = {
	chat_admin: '#34d399',
	chat_member: '#818cf8',
};

export const CHANNEL_MODAL_HEADER = {
	pm: 'Открыть личный чат',
	channel: 'Создать канал',
	channel_join: 'Выбрать канал',
};

export const CHANNEL_HEADER_VISIBILITY = {
	public: 'Публичный',
	private: 'Приватный',
};

export const PLURAL_OPTIONS = {
	one: 'участник',
	few: 'участника',
	many: 'участников',
};

export const DATE_FORMAT = 'dd.MM.yyyy';

export const TIME_FORMAT = 'HH:mm';

export const BASE_MESSAGE_MENU = [
	{ text: 'Ответить', id: 'reply' },
	{ text: 'Закрепить', id: 'pin' },
];

export const PERMITTED_MESSAGE_MENU = [
	{ text: 'Редактировать', id: 'edit' },
	{ text: 'Удалить', id: 'delete' },
];
