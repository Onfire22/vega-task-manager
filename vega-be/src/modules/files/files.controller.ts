import { NextFunction, Request, Response } from 'express';

export const uploadFile = async (req: Request<{}, {}, { entity: string }>, res: Response, next: NextFunction) => {
	try {
		const file = req.file;
		const filename = `/public/uploads/${file?.filename}`;

		res.json({ ...file, filename });
	} catch (e) {
		next(e);
	}
};
