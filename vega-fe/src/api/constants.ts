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
	currentUser: '/api/users/current',
	createTask: '/api/tasks/create',
	getTasks: '/api/tasks',
	dictionaries: '/api/dictionaries',
	getTask: '/api/task/',
	getUsers: '/api/users',
	updateTaskStatus: '/api/tasks/status-update',
	projects: '/api/projects',
};
