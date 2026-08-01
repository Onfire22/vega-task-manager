import multer from 'multer';
import path from 'path';
import { MIME_TO_EXT_MAP, UPLOADS_MAP } from './constants';
import fs from 'node:fs/promises';

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		let folderPath = null;
		if (req.body.items) {
			const items = JSON.parse(req.body.items);

			const entity = items[0]?.entity;
			folderPath = `public/uploads/${entity}`;
		} else {
			folderPath = UPLOADS_MAP[file.fieldname as keyof typeof UPLOADS_MAP];
		}

		if (!folderPath) {
			return cb(null, 'Unknown file destination');
		}

		await fs.mkdir(path.join(process.cwd(), folderPath), {
			recursive: true,
		});

		cb(null, path.join(process.cwd(), folderPath));
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname) || MIME_TO_EXT_MAP[file.mimetype] || '';
		const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
		cb(null, name);
	},
});

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
	const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

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
	},
});
