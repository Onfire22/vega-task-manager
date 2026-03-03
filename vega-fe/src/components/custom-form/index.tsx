import React from 'react';
import './styles.less';

interface IProps {
	title: string;
	children: React.ReactNode;
	onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const CustomForm: React.FC<IProps> = ({ title, children, onSubmit }) => {
	return (
		<form className="custom-form" onSubmit={onSubmit}>
			<h1 className="custom-form__title">{title}</h1>
			{children}
		</form>
	);
};

export { CustomForm };
