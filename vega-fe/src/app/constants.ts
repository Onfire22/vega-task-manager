export const FRONT_ROUTES = {
	root: '/',
	signIn: '/sign-in',
	signUp: '/sign-up',
	profile: '/profile',
	task: '/task/:uuid',
	projects: '/projects',
	project: '/project/:uuid',
	all: '*',
};

export const CACHING_SETTINGS = {
	refetchOnMountOrArgChange: false,
	refetchOnFocus: false,
	refetchOnReconnect: false,
};
