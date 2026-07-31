import { NextFunction, Request, Response } from 'express';

export const createTeamController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log(req.body);
	} catch (e) {
		next(e);
	}
};
