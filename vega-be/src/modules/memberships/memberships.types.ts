export interface IChangeUserMembershipRoleBody {
	userUuid: string;
	userRole: 'viewer' | 'member' | 'owner';
}

export interface IChangeUserMembershipRoleParams {
	uuid: string;
}
