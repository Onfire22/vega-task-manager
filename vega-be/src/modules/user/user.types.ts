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
	withoutUser: string;
}

export interface IGetUserListRequestBody {
	filters?: IFilters;
}

export interface IGetUserListResponse {
	usersList: Array<Partial<Pick<IUser, 'id' | 'name' | 'secondName'>>>;
}

export interface IUpdateUserBody {
	name: string;
	secondName: string;
	userSpecialisationUuid: string;
}
