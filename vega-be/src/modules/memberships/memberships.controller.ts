import { RESPONSE_STATUSES } from '../../common/constants';
import { NextFunction, Request, Response } from 'express';
import { TChangeUserMembershipBody, TChangeUserMembershipParams } from './memberships.types';
import { membershipsService } from './memberships.service';

export const changeUserMembership = async (
	req: Request<TChangeUserMembershipParams, {}, TChangeUserMembershipBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { uuid } = req.params;

		const { userUuid, userRole } = req.body;

		await membershipsService.changeUserRole(userUuid, userRole, uuid, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(e);
	}
};
