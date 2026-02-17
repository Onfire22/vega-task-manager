import { BASE_URL, DEFAULT_HEADERS, METHODS } from './constants.ts';

export const makeRequest = async (method: string, path: string = '', bodyData = {}, headers = {}) => {
	const response = await fetch(`${BASE_URL}/${path}`, {
		...(method === METHODS.get ? {} : { body: JSON.stringify(bodyData) }),
		headers: {
			...DEFAULT_HEADERS,
			...headers,
		},
		method,
	});

	return await response.json();
};
