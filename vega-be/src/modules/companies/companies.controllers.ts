import { NextFunction, Request, Response } from 'express';
import { TCompanyCreateRequestSchema } from './companies.types';
import { companiesService } from './companies.service';

export const createCompanyController = async (
	req: Request<{}, {}, TCompanyCreateRequestSchema>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const companyData = {
			...req.body,
			companyAvatar: req.file?.filename ?? '',
		};

		await companiesService.createCompany(companyData);

		res.status(200).json({ success: true });
	} catch (e) {
		console.log(e);
		next(e);
	}
};
