import { Router } from 'express';
import { ROUTES } from '../../common/constants';
import { uploadFile } from './files.controller';
import { upload } from '../../lib/multer';

const filesRouter = Router();

filesRouter.post(ROUTES.uploadFile, upload.single('file'), uploadFile);

export { filesRouter };
