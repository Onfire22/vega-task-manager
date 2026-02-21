import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { router } from './router';
import { authRouter } from './auth/auth.router';
import { authMiddleware } from './auth/auth.middleware';
import cors from 'cors';

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

app.use(authMiddleware);

app.use(router);

const main = async () => {
	try {
		app.listen(port, () => {
			console.log('\x1b[42m%s\x1b[0m', `Server running at port: ${port}`);
		});
	} catch (e) {
		console.log(e);
	}
};

main();
