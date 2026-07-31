import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import { uploadFileController } from './files.controller';
import { upload } from '../../lib/multer';

const filesRouter = Router();

filesRouter.post(ROUTES.uploadFile, upload.single('file'), uploadFileController);

export { filesRouter };
