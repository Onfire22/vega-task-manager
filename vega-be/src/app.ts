import express from 'express';
import 'dotenv/config';

const port = process.env.PORT;

const app = express();

app.get('/', (_req, res) => {
	res.json({ message: 'ok' });
});

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
