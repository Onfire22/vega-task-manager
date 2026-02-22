import { Router } from 'express';
import { getStackList } from './stack.controller';

const stackRouter = Router();

stackRouter.get('/', getStackList);

export { stackRouter };
