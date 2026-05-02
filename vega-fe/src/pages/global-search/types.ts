interface Project {
	id: string;
	code: string;
	title: string;
	link: string;
}

interface Task {
	id: string;
	code: string;
	title: string;
	link: string;
}

interface User {
	id: string;
	link: string;
	name: string;
	email: string;
	userName: string;
}

interface Comment {
	id: string;
	text: string;
	taskUuid: string;
	link: string;
}

interface Log {
	id: string;
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
