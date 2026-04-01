import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { protectedRouter } from './router';
import { authRouter } from './modules/auth/auth.router';
import { authMiddleware } from './modules/auth/auth.middleware';
import cors from 'cors';
import { errorMiddleware } from './errors/errors.middleware';
import { dictionaryRouter } from './modules/dictionary/dictionary.router';
import { initRedis } from './lib/redis/redis';

const port = process.env.PORT;

const app = express();

app.disable('x-powered-by');

app.use(
	cors({
		origin: 'http://localhost:5173',
	}),
);

app.use(json());
app.use(cookieParser());

app.use(authRouter);
app.use(dictionaryRouter);

app.use(authMiddleware);

app.use(protectedRouter);

app.use(errorMiddleware);

const main = async () => {
	try {
		await initRedis();
		app.listen(port, () => {
			console.log('\x1b[42m%s\x1b[0m', `Server running at port: ${port}`);
		});
	} catch (e) {
		console.log(e);
	}
};

main();
