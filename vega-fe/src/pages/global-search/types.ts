interface Project {
	uuid: string;
	code: string;
	title: string;
	link: string;
}

interface Task {
	uuid: string;
	code: string;
	title: string;
	link: string;
}

interface User {
	uuid: string;
	link: string;
	name: string;
	email: string;
	userName: string;
}

interface Comment {
	uuid: string;
	text: string;
	taskUuid: string;
	link: string;
}

interface Log {
	uuid: string;
	description: string;
	taskUuid: string;
	link: string;
}

export interface SearchResults {
	projects: Array<Project>;
	tasks: Array<Task>;
	users: Array<User>;
	comments: Array<Comment>;
	logs: Array<Log>;
}

export type TSearchResultsValues = SearchResults[keyof SearchResults];
