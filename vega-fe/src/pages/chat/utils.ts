import type { IUser } from '@/pages/chat/types.ts';
import { getAvatarColor } from '@/app/utils.ts';

export const getChannelWithNormalizeUsers = (users: Array<IUser>) => {
	return users.map((user) => {
		return {
			id: user.id,
			name: `${user.name} ${user.secondName}`,
			role: user.role,
			avatar: {
				initials: `${user.name[0]}.${user.secondName[0]}.`.toUpperCase(),
				color: getAvatarColor(user.id),
			},
		};
	});
};
