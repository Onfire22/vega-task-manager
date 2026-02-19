import React from 'react';
import './styles.less';

interface IProps {
	type: 'submit' | 'button';
	onClick?: () => void;
	children?: string;
	className?: string;
}

const CustomButton: React.FC<IProps> = ({
	type,
	onClick,
	className,
	children,
}) => {
	return (
		<button
			className={`custom-button ${className ? className : ''}`}
			type={type}
			onClick={onClick}
		>
			<span className="custom-button__text">{children}</span>
		</button>
	);
};

export { CustomButton };
