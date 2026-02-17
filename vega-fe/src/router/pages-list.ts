import { TasksPage } from '../pages/tasks-page';
import { SignInPage } from '../pages/sign-in-page';
import { SignUpPage } from '../pages/sign-up-page';

const pagesList = {
	tasksPage: {
		id: 'tasks',
		path: '/',
		component: TasksPage,
	},
	signInPage: {
		id: 'sign-in',
		path: '/sign-in',
		component: SignInPage,
	},
	signUpPage: {
		id: 'sign-up',
		path: '/sign-up',
		component: SignUpPage,
	},
};

export { pagesList };
