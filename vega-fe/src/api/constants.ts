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
	priorities: '/api/priorities',
	taskStatuses: '/api/statuses',
	stack: '/api/stack',
	createTask: '/api/tasks/create',
	getTasks: '/api/tasks/userTasks',
};
