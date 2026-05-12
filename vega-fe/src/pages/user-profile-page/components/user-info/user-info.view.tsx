import { Button } from '@/components/ui/button.tsx';
import React from 'react';
import { Camera } from 'lucide-react';
import type { IUserData } from '@/pages/user-profile-page/types.ts';

interface IProps {
	userData: IUserData;
	onSetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSaveAvatar: () => void;
	onDeleteAvatar: () => void;
	onSetIsAvatarUploaderShown: (value: boolean) => void;
	preview: string | null;
	file: File | null;
	isAvatarUploaderShown: boolean;
}

const UserInfoView: React.FC<IProps> = ({
	userData,
	onSetFile,
	onSaveAvatar,
	preview,
	file,
	onDeleteAvatar,
	isAvatarUploaderShown,
	onSetIsAvatarUploaderShown,
}) => {
	return (
		<div className="bg-card rounded-lg">
			<div className="flex items-center gap-5 px-4.5 py-5">
				<div
					className="w-15 h-15 rounded-full flex items-center justify-center text-white relative"
					style={{ background: preview ? 'transparent' : userData.avatar }}
					onMouseEnter={() => onSetIsAvatarUploaderShown(true)}
					onMouseLeave={() => onSetIsAvatarUploaderShown(false)}
				>
					{preview || userData.avatarUrl ? (
						<img src={preview ?? userData.avatarUrl} alt="user avatar" />
					) : (
						<span>{userData.initials}</span>
					)}
					{isAvatarUploaderShown && (
						<label className="absolute bg-secondary w-full bottom-0 opacity-80 rounded-b-full flex items-center justify-center cursor-pointer h-1/2">
							<Camera />
							<input type="file" style={{ display: 'none' }} onChange={onSetFile} />
						</label>
					)}
				</div>
				<div>
					<div className="text-white">{userData.name}</div>
					<div className="text-[12px] text-muted-foreground">{userData.userName}</div>
					<div className="-ml-1.25">
						<Button size="xs" variant="primary" onClick={onSaveAvatar} disabled={!file}>
							Сохранить фото
						</Button>
						<Button
							size="xs"
							variant="default"
							disabled={!file && !userData.avatarUrl}
							onClick={onDeleteAvatar}
						>
							Удалить фото
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { UserInfoView };
