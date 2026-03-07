import * as yup from 'yup';

export const LogTimeFormValidation = yup.object().shape({
	estimate: yup.string().matches(/^\d+[hm]$/, 'Формат времени: 1h, 30m и т.д.'),
	loggedTime: yup.string().matches(/^\d+[hm]$/, 'Формат времени: 1h, 30m и т.д.'),
});
