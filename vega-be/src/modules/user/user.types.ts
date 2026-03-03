export interface IUser {
	email: string;
	id: string;
	name: string;
	secondName: string | null;
}

export interface IUserResponse {
	currentUser: IUser;
}

export interface IFilters {
	withOutProject: string;
	withProject: string;
}

export interface IGetUserListRequestBody {
	filters?: IFilters;
}

export interface IGetUserListResponse {
	usersList: Array<Partial<Pick<IUser, 'id' | 'name' | 'secondName'>>>;
}
