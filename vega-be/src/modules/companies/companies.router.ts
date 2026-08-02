import { ROUTES } from '../../router/routes';
import { Router } from 'express';
import { upload } from '../../lib/multer';
import { createCompanyController } from './companies.controllers';
import { getFilePathMiddleware } from '../files/files.middlewares';

const companiesRouter = Router();
companiesRouter.get(ROUTES.company, () => {});
companiesRouter.post(ROUTES.company, upload.single('companyAvatar'), getFilePathMiddleware, createCompanyController);
companiesRouter.patch(ROUTES.company, () => {});

export { companiesRouter };
