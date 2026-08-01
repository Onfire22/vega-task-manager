import { NextFunction, Request, Response } from 'express';
import { RESPONSE_STATUSES } from '../../common/constants';
import { teamsService } from './teams.service';

export const createTeamController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const files = req.files as Array<Express.Multer.File>;

		await teamsService.createTeams(JSON.parse(req.body.items), files);
		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		console.log(e);
		next(e);
	}
};
