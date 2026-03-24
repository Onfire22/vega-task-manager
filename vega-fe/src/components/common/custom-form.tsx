import React from 'react';

interface IProps {
	title: string;
	children: React.ReactNode;
	onSubmit?: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const CustomForm: React.FC<IProps> = ({ title, children, onSubmit }) => {
	return (
		<form
			className="w-full p-7.5 flex-centered-column gap-2.5 border border-border rounded-[5px]"
			onSubmit={onSubmit}
		>
			<h1 className="text-2xl">{title}</h1>
			{children}
		</form>
	);
};

export { CustomForm };
