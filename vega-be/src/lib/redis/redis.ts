import { createClient } from 'redis';

export const redisClient = createClient({ url: process.env.REDIS_URL });

export const initRedis = async () => {
	redisClient.on('error', (e) => {
		console.log('Redis client error: ', e);
	});
	redisClient.on('connect', () => {
		console.log('\x1b[42m%s\x1b[0m', 'Redis client connected!');
	});

	await redisClient.connect();
};
