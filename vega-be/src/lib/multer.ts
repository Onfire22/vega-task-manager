import multer from 'multer';
import path from 'path';
import { UPLOADS_MAP } from './constants';
import fs from 'node:fs/promises';

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		const folderPath = UPLOADS_MAP[file.fieldname as keyof typeof UPLOADS_MAP];

		if (!folderPath) {
			return cb(null, 'Unknown file destination');
		}

		try {
			await fs.readdir(path.join(process.cwd(), folderPath));
		} catch (e) {
			await fs.mkdir(path.join(process.cwd(), folderPath));
		}

		cb(null, path.join(process.cwd(), folderPath));
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
		cb(null, name);
	},
});

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
	const allowed = ['image/jpeg', 'image/png', 'image/webp'];

	if (allowed.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Недопустимый тип файла'));
	}
};

export const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 1024 * 1024,
		files: 1,
	},
});
