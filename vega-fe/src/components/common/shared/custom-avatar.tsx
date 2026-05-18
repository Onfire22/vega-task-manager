import React from 'react';
import { BASE_URL } from '@/api/constants.ts';

interface IProps {
	avatarUrl?: string | null;
	initials?: string;
}

const CustomAvatar: React.FC<IProps> = ({ avatarUrl, initials }) => {
	return avatarUrl ? <img src={`${BASE_URL}${avatarUrl}`} alt="user avatar" /> : <span>{initials}</span>;
};

export { CustomAvatar };
