import { useMemo } from 'react';
import { useGetCurrentUserQuery } from '@/api/auth/auth.api.ts';
import { getAvatarColor } from '@/app/utils.ts';
import { useDictionariesOptions } from '@/api/dictionaries/dictionaries.hooks.ts';
import type { IUserData } from '@/pages/user-profile-page/types.ts';

export const usePersonalData = () => {
	const { currentData, isLoading } = useGetCurrentUserQuery();
	const { dictionariesOptions, isDictionariesLoading } = useDictionariesOptions(['USER_SPECIALISATION']);

	const userData = useMemo(() => {
		if (!currentData || !dictionariesOptions.userSpecialisation) return null;
		return {
			name: currentData.currentUser.name,
			secondName: currentData.currentUser.secondName,
			userName: currentData.currentUser.userName,
			userSpecialisationUuid: currentData.currentUser.userSpecialisation.id,
		};
	}, [currentData, dictionariesOptions.userSpecialisation]);

	const options = useMemo(() => {
		return dictionariesOptions.userSpecialisation ?? [];
	}, [dictionariesOptions.userSpecialisation]);

	return {
		userData,
		options,
		isLoading: isDictionariesLoading || isLoading || !userData,
	};
};

export const useUserInfo = () => {
	const { currentData, isLoading } = useGetCurrentUserQuery();

	const userData: IUserData = {
		userName: `@${currentData?.currentUser.userName}`,
		name: `${currentData?.currentUser.name} ${currentData?.currentUser.secondName}`,
	};

	if (currentData?.currentUser?.avatarUrl) {
		userData.avatarUrl = currentData?.currentUser?.avatarUrl;
	} else {
		userData.initials =
			`${currentData?.currentUser.name.slice(0, 1)}. ${currentData?.currentUser.userName.slice(0, 1)}.`.toUpperCase();
		userData.avatar = getAvatarColor(currentData?.currentUser.id);
	}

	return {
		userData,
		isLoading,
	};
};
