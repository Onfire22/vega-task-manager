export const REFRESH_TTL = 7 * 24 * 3600;

export const ACCESS_TTL = 15 * 60;

export const RESPONSE_STATUSES = {
	success: 200,
	authorised: 201,
	notAuthorised: 401,
	notFound: 404,
	internalError: 500,
	badRequest: 400,
	notAllowed: 405,
};

export const TIME_COEFFICIENTS = { h: 3600, m: 60 };

export const DICTIONARY_SELECT = { uuid: true, label: true, key: true };

export const USER_SELECT = { uuid: true, name: true, secondName: true };
