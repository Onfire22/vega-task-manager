export const HOUR = '1h';

export const HOUR_IN_MS = 1000 * 60 * 60;

export const RESPONSE_STATUSES = {
	success: 200,
	authorised: 201,
	notAuthorised: 401,
	notFound: 404,
	iternalError: 500,
};

export const ROUTES = {
	root: '/',
	signIn: '/api/sign-in',
	signUp: '/api/sign-up',
	logout: '/api/logout',
	users: '/api/users',
	currentUser: '/api/users/current',
	dictionaries: '/api/dictionaries',
	tasks: '/api/tasks',
	createTask: '/api/tasks/create',
	task: '/api/task',
};
