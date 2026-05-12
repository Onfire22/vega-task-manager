import { userService } from '../user/user.service';

const updateAvatar = (entity: string, avatar: string, userUuid: string) => {
	if (entity === 'user') {
		return userService.updateUser({ avatarUrl: avatar }, userUuid);
	}
};

export const filesService = { updateAvatar };
