import * as yup from 'yup';
import { PASSWORD_REQUIREMENTS, VALIDATION_MESSAGES } from './constants.ts';

const passwordSchema = PASSWORD_REQUIREMENTS.reduce(
	(schema, requirement) => schema.matches(requirement.regex, requirement.label),
	yup.string().required(VALIDATION_MESSAGES.required).min(8, VALIDATION_MESSAGES.passwordLength),
);

export const SignUpValidationSchema = yup.object().shape({
	email: yup.string().email(VALIDATION_MESSAGES.email).required(VALIDATION_MESSAGES.required),
	password: passwordSchema,
	passwordRepeat: yup
		.string()
		.oneOf([yup.ref('password'), undefined], VALIDATION_MESSAGES.passwordRepeat)
		.required(VALIDATION_MESSAGES.required),
	name: yup
		.string()
		.matches(/^[A-Za-zА-Яа-яЁё]+$/, VALIDATION_MESSAGES.lettersOnly)
		.required(VALIDATION_MESSAGES.required),
	secondName: yup
		.string()
		.matches(/^[A-Za-zА-Яа-яЁё]+$/, VALIDATION_MESSAGES.lettersOnly)
		.required(VALIDATION_MESSAGES.required),
});
