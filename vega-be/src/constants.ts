export const HOUR = '1h';

export const HOUR_IN_MS = 1000 * 60 * 60;

export const RESPONSE_STATUSES = {
	success: 200,
	authorised: 201,
	notAuthorised: 401,
	notFound: 404,
	iternalError: 500,
	badRequest: 400,
	notAllowed: 405,
};

export const ROUTES = {
	root: '/',
	signIn: '/api/sign-in',
	signUp: '/api/sign-up',
	logout: '/api/logout',
	users: '/api/users',
	currentUser: '/api/users/current',
	userByEmail: '/api/users/email',
	dictionaries: '/api/dictionaries',
	tasks: '/api/tasks',
	task: '/api/task/:uuid',
	createTask: '/api/tasks/create',
	estimateTask: '/api/tasks/:uuid/estimate',
	projects: '/api/projects',
	projectsCreate: '/api/projects/create',
	project: '/api/projects/:uuid',
	projectUsers: '/api/projects/:uuid/members',
	createTaskLog: '/api/taskLogs/create',
};

export const TIME_COEFFICIENTS = { h: 3600, m: 60 };
