import { TSearchResults } from './global-search.types';

export const getNormalizedResults = (resultsDto: TSearchResults) => {
	return {
		projects: resultsDto.projects.map((item) => ({ ...item, link: `/project/${item.uuid}` })),
		tasks: resultsDto.tasks.map((item) => ({ ...item, link: `/task/${item.uuid}` })),
		users: resultsDto.users.map((item) => ({
			id: item.uuid,
			link: `/users/${item.uuid}`,
			name: `${item.name} ${item.secondName}`,
			email: item.email,
			userName: item.userName,
		})),
		comments: resultsDto.comments.map((item) => ({ ...item, link: `/task/${item.taskUuid}` })),
		logs: resultsDto.logs.map((item) => ({ ...item, link: `/task/${item.taskUuid}` })),
	};
};
