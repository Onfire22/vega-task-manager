import { redisClient } from './redis';

export const setToRedis = async (key: string, value: any, ttl = 60) => {
	await redisClient.set(key, JSON.stringify(value), {
		EX: ttl,
	});
};

export const getFromRedis = async (key: string) => {
	const data = await redisClient.get(key);

	if (data) {
		return JSON.parse(data);
	}

	return null;
};

export const deleteFromRedis = async (key: string) => {
	await redisClient.del(key);
};
