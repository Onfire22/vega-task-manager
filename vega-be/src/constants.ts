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
	signIn: '/api/sign-in',
	signUp: '/api/sign-up',
	logout: '/api/logout',
	users: '/api/users',
	stack: '/api/stack',
	priorities: '/api/priorities',
	tasks: '/api/tasks',
	createTask: '/create',
	getTasks: '/userTasks',
};
