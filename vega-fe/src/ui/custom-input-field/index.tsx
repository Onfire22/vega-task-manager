import React from 'react';
import { useState } from 'react';
import './styles.less';

interface IProps {
	type: 'text' | 'password' | 'search' | 'email';
	value: string;
	label?: string;
	error?: string;
	icon?: string;
	placeholder?: string;
	id: string;
	onchange: () => void;
}

const CustomInputField: React.FC<IProps> = ({
	type,
	value,
	label,
	onchange,
	error,
	id,
	icon,
	placeholder,
}) => {
	const [isPasswordShown, setIsPasswordShown] = useState(false);

	const handleButtonClick = () => {
		setIsPasswordShown((prev) => !prev);
	};

	const passwordStatus = isPasswordShown ? 'text' : 'password';

	return (
		<div className="custom-input">
			{label && (
				<label className="custom-input__label" htmlFor={id}>
					{label}
				</label>
			)}
			<div
				className={`custom-input__content${error ? ' custom-input__content_error' : ''}`}
			>
				<input
					className="custom-input__input"
					type={type === 'password' ? passwordStatus : type}
					value={value}
					onChange={onchange}
					id={id}
					placeholder={placeholder}
				/>
				{type === 'password' && (
					<button
						className="custom-input__button"
						type="button"
						onClick={handleButtonClick}
					>
						{icon}
					</button>
				)}
			</div>
			{error && <span className="custom-input__error">{error}</span>}
		</div>
	);
};

export { CustomInputField };
