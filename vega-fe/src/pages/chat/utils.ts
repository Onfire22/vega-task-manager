import type { IUser } from '@/pages/chat/types.ts';
import { getAvatarColor } from '@/app/utils.ts';
import { isEqual, parse } from 'date-fns';
import { DATE_FORMAT } from '@/pages/chat/constants.ts';

export const getChannelWithNormalizeUsers = (users?: Array<IUser>) => {
	if (!users) return [];

	return users.map((user) => {
		return {
			uuid: user.uuid,
			name: `${user.name} ${user.secondName}`,
			role: user.role,
			avatar: {
				initials: `${user.name[0]}.${user.secondName[0]}.`.toUpperCase(),
				color: getAvatarColor(user.uuid),
			},
		};
	});
};

export const isDatesEqual = (date1: string, date2: string) => {
	const parsedDate1 = parse(date1, DATE_FORMAT, new Date());
	const parsedDate2 = parse(date2, DATE_FORMAT, new Date());

	return isEqual(parsedDate1, parsedDate2);
};
