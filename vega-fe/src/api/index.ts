import { BASE_URL, DEFAULT_HEADERS, METHODS } from './constants.ts';

export const makeRequest = async ({
	method,
	path,
	bodyData = {},
	headers = {},
}: {
	method: string;
	path: string;
	bodyData: object;
	headers: object;
}) => {
	try {
		const response = await fetch(`${BASE_URL}${path}`, {
			...(method === METHODS.get ? {} : { body: JSON.stringify(bodyData) }),
			headers: {
				...DEFAULT_HEADERS,
				...headers,
			},
			method,
			credentials: 'include',
		});

		if (response.ok) {
			const data = await response.json();
			return { data };
		}

		const errorData = await response.json();
		return {
			error: {
				status: response.status,
				data: errorData,
			},
		};
	} catch (e: unknown) {
		let message = 'Unknown error';
		if (e instanceof Error) message = e.message;
		return {
			error: {
				status: 500,
				data: message,
			},
		};
	}
};
