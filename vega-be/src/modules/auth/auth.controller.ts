import { Request, Response, NextFunction } from 'express';
import { IAuthRes, TSignUpBody, TSignInBody, TUserByEmailBody } from './auth.types';
import { REFRESH_TTL, RESPONSE_STATUSES } from '../../common/constants';
import { authService } from './auth.service';

export const signupUserController = async (
	req: Request<{}, {}, TSignUpBody>,
	res: Response<IAuthRes>,
	next: NextFunction,
) => {
	try {
		const tokens = await authService.signupUser(req.body);

		res.status(RESPONSE_STATUSES.authorised)
			.cookie('refreshToken', tokens.refreshToken, {
				httpOnly: true,
				maxAge: REFRESH_TTL * 1000,
			})
			.json({ accessToken: tokens.accessToken });
	} catch (e) {
		next(e);
	}
};

export const signInUserController = async (
	req: Request<{}, {}, TSignInBody>,
	res: Response<IAuthRes>,
	next: NextFunction,
) => {
	try {
		const tokens = await authService.signInUser(req.body);

		res.status(RESPONSE_STATUSES.authorised)
			.cookie('refreshToken', tokens.refreshToken, {
				httpOnly: true,
				maxAge: REFRESH_TTL * 1000,
			})
			.json({ accessToken: tokens.accessToken });
	} catch (e) {
		next(e);
	}
};

export const getUserByEmailController = async (
	req: Request<{}, {}, TUserByEmailBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		await authService.getUserByEmail(req.body.email);

		res.status(200).json({ success: true });
	} catch (e) {
		next(e);
	}
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tokens = await authService.refreshUserToken(req.cookies.refreshToken);

		res.cookie('refreshToken', tokens?.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: REFRESH_TTL * 1000,
		});

		res.json({ accessToken: tokens?.accessToken });
	} catch (e) {
		next(e);
	}
};

export const logOutUserController = async (req: Request, res: Response) => {
	await authService.logOutUser(req.cookies.refreshToken);

	res.clearCookie('refreshToken').json({ success: true });
};
