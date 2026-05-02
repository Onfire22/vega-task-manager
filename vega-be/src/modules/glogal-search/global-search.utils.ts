import { TSearchResults } from './global-search.types';

export const getNormalizedResults = (resultsDto: TSearchResults) => {
	return {
		projects: resultsDto.projects.map((item) => ({ ...item, link: `/project/${item.id}` })),
		tasks: resultsDto.tasks.map((item) => ({ ...item, link: `/task/${item.id}` })),
		users: resultsDto.users.map((item) => ({
			id: item.id,
			link: `/users/${item.id}`,
			name: `${item.name} ${item.secondName}`,
			email: item.email,
			userName: item.userName,
		})),
		comments: resultsDto.comments.map((item) => ({ ...item, link: `/task/${item.taskUuid}` })),
		logs: resultsDto.logs.map((item) => ({ ...item, link: `/task/${item.taskUuid}` })),
	};
};
