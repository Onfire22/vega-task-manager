import { userService } from '../user/user.service';
import path from 'path';
import fs from 'node:fs/promises';

const deleteFile = async (fileUrl: string) => {
	try {
		const url = new URL(fileUrl);
		const filePath = path.join(process.cwd(), url.pathname);
		await fs.unlink(filePath);
	} catch (e) {
		if (e instanceof Error) {
			const err = e as NodeJS.ErrnoException;
			if (err.code !== 'ENOENT') throw err;
			return;
		}
	}
};

const updateAvatar = (entity: string, avatar: string, userUuid: string) => {
	if (entity === 'user') {
		return userService.updateUser({ avatarUrl: avatar }, userUuid);
	}
};

export const filesService = { updateAvatar, deleteFile };
