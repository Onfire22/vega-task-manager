import { useFormik } from 'formik';
import { INFO_DEFAULT_VALUES } from '../../constants.ts';
import React from 'react';
import { InfoFormView } from './info-form-view';
import { InfoFormValidationSchema } from '../../validation.ts';

const InfoForm = () => {
	const formik = useFormik({
		initialValues: INFO_DEFAULT_VALUES,
		validationSchema: InfoFormValidationSchema,
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		formik.setFieldError(name, '');
		formik.handleChange(e);
	};

	return (
		<InfoFormView
			formValues={formik.values}
			formErrors={formik.errors}
			onFieldChange={handleFieldChange}
			onFormSubmit={formik.handleSubmit}
		/>
	);
};

export { InfoForm };
