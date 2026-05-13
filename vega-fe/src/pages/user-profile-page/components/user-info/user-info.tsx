import { UserInfoView } from '@/pages/user-profile-page/components/user-info/user-info.view.tsx';
import { useUserInfo } from '@/pages/user-profile-page/hooks.ts';
import React, { useState } from 'react';
import { useUploadFileMutation } from '@/api/files/files.api.ts';
import { useDeleteUserAvatarMutation, useUpdateUserMutation } from '@/api/users/users.api.ts';
import { toast } from 'sonner';

const UserInfo = () => {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isAvatarUploaderShown, setIsAvatarUploaderShown] = useState(false);

	const { userData, isLoading } = useUserInfo();

	const [uploadFile] = useUploadFileMutation();
	const [deleteAvatar] = useDeleteUserAvatarMutation();
	const [updateUser] = useUpdateUserMutation();

	const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files[0];
		setFile(file);
		setPreview(URL.createObjectURL(file));
	};

	const handleSaveAvatar = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);
		try {
			const result = await uploadFile(formData).unwrap();
			if (result.filename) {
				updateUser({ avatarUrl: result.filename });
			}
		} catch (e) {
			const error = e as { data?: { message?: string } };
			toast.error(error.data?.message ?? 'Something went wrong');
		}
		setFile(null);
		toast.success('Автар успешно обновлен');
	};

	const handleDeleteAvatar = () => {
		if (userData?.avatarUrl) {
			deleteAvatar({ avatarUrl: userData.avatarUrl });
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
