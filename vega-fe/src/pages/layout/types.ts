export interface IInitialState {
	isSidebarOpened: boolean;
	searchValue: string;
}

export interface ICurrentUser {
	avatarUrl: string | null;
	email: string;
	isSuperUser: boolean;
	name: string;
	secondName: string;
	userName: string;
	uuid: string;
}
