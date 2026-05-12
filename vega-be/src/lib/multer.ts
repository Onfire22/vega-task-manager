import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'uploads'));
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
