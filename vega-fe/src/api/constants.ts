export const BASE_URL = 'http://localhost:3001';

export const METHODS = {
	post: 'POST',
	delete: 'DELETE',
	patch: 'PATCH',
	get: 'GET',
	put: 'PUT',
};

export const ROUTES = {
	signUp: '/api/sign-up',
	signIn: '/api/sign-in',
	logout: '/api/logout',
	refresh: '/api/refresh',
	currentUser: '/api/users/current',
	createTask: '/api/tasks/create',
	getTask: '/api/task/',
	getTasks: '/api/tasks',
	updateTask: '/api/task/',
	dictionaries: '/api/dictionaries',
	getUsers: '/api/users',
	userByEmail: '/api/users/email',
	updateTaskStatus: '/api/tasks/status-update',
	projects: '/api/projects',
	createProject: '/api/projects/create',
	project: '/api/projects',
	comments: '/api/tasks/comments',
	currentUserPassword: '/api/users/current/password',
};

export const TAG_TYPES = ['CurrentUser', 'Tasks', 'Task', 'Users', 'Projects', 'Project', 'Comments'];
