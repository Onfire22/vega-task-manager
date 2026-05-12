import { NextFunction, Request, Response } from 'express';
import { filesService } from './files.service';

export const uploadFile = async (req: Request<{}, {}, { entity: string }>, res: Response, next: NextFunction) => {
	try {
		const file = req.file;
		const fileName = `/public/uploads/${file?.filename}`;

		await filesService.updateAvatar(req.body.entity, fileName, res.locals.user.id);

		res.json({ file });
	} catch (e) {
		console.log(e);
		next(e);
	}
};
