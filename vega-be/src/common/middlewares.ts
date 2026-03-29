import { type ZodType } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const validateMiddleware =
	(schema: ZodType, type: 'body' | 'params' | 'query' = 'body') =>
	async (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req[type]);

		if (!result.success) {
			return res.status(400).json({
				error: 'Validation failed',
				details: result.error.flatten((issue) => issue.message),
			});
		}

		next();
	};
