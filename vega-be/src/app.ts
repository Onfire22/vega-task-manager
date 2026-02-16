import express, { json } from 'express';
import 'dotenv/config';
import { router } from './router';

const port = process.env.PORT;

const app = express();

app.use(json());
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
