export const REFRESH_TTL = 7 * 24 * 3600;

export const ACCESS_TTL = 15 * 60;

export const RESPONSE_STATUSES = {
	success: 200,
	authorised: 201,
	notAuthorised: 401,
	notFound: 404,
	internalError: 500,
	badRequest: 400,
	notAllowed: 405,
};

export const ROUTES = {
	root: '/',
	signIn: '/api/sign-in',
	signUp: '/api/sign-up',
	logout: '/api/logout',
	refresh: '/api/refresh',
	users: '/api/users',
	currentUser: '/api/users/current',
	deleteAvatar: '/api/users/current/avatar',
	userByEmail: '/api/users/email',
	dictionaries: '/api/dictionaries',
	tasks: '/api/tasks',
	createTask: '/api/task',
	task: '/api/task/:uuid',
	getTaskLogs: '/api/task/:uuid/logs',
	updateTaskEstimate: '/api/tasks/:uuid/estimate',
	createTaskLog: '/api/taskLogs/',
	projects: '/api/projects',
	projectsCreate: '/api/projects/create',
	project: '/api/projects/:uuid',
	projectUsers: '/api/projects/:uuid/members',
	comment: '/api/tasks/comments/:uuid',
	comments: '/api/tasks/:uuid/comments',
	currentUserPassword: '/api/users/current/password',
	notifications: '/api/notifications',
	userChannels: '/api/user_channels',
	channels: '/api/channels',
	messages: '/api/messages/:channelUuid',
	search: '/api/gloabl-search',
	uploadFile: '/api/upload/single',
};

export const TIME_COEFFICIENTS = { h: 3600, m: 60 };

export const DICTIONARY_SELECT = { id: true, label: true, key: true };

export const USER_SELECT = { id: true, name: true, secondName: true };
