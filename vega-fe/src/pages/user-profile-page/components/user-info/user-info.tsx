import { UserInfoView } from '@/pages/user-profile-page/components/user-info/user-info.view.tsx';
import { useUserInfo } from '@/pages/user-profile-page/hooks.ts';
import React, { useState } from 'react';
import { useUploadFileMutation } from '@/api/files/files.api.ts';
import { useUpdateUserMutation } from '@/api/users/users.api.ts';

const UserInfo = () => {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isAvatarUploaderShown, setIsAvatarUploaderShown] = useState(false);

	const { userData, isLoading } = useUserInfo();

	const [uploadFile] = useUploadFileMutation();
	const [updateUser] = useUpdateUserMutation();

	const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files[0];
		setFile(file);
		setPreview(URL.createObjectURL(file));
	};

	const handleSaveAvatar = () => {
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);
		formData.append('entity', 'user');
		uploadFile(formData);
	};

	const handleDeleteAvatar = () => {
		if (userData?.avatarUrl) {
			updateUser({ avatarUrl: null });
		}
		setPreview(null);
		setFile(null);
	};

	const handleSetIsAvatarUploaderShown = (value: boolean) => {
		setIsAvatarUploaderShown(value);
	};

	return isLoading ? (
		<div>Loading</div>
	) : (
		<UserInfoView
			userData={userData}
			preview={preview}
			file={file}
			isAvatarUploaderShown={isAvatarUploaderShown}
			onSetFile={handleSetFile}
			onSaveAvatar={handleSaveAvatar}
			onDeleteAvatar={handleDeleteAvatar}
			onSetIsAvatarUploaderShown={handleSetIsAvatarUploaderShown}
		/>
	);
};

export { UserInfo };
