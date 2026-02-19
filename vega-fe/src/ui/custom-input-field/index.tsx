import React from 'react';
import { useState } from 'react';
import EyeOpened from '../../assets/icons/eye-opened.svg?react';
import EyeClosed from '../../assets/icons/eye-closed.svg?react';
import './styles.less';
import { CustomTooltip } from '../tooltip';

interface IProps {
	type: 'text' | 'password' | 'search' | 'email';
	value: string;
	label?: string;
	error?: string;
	placeholder?: string;
	name?: string;
	id: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	tooltip?: React.ReactNode;
}

const CustomInputField: React.FC<IProps> = ({
	type,
	value,
	label,
	onChange,
	error,
	id,
	placeholder,
	tooltip,
	name,
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
					<span>{label}</span>
					{tooltip && <CustomTooltip children={tooltip} />}
				</label>
			)}
			<div
				className={`custom-input__content${error ? ' custom-input__content_error' : ''}`}
			>
				<input
					className="custom-input__input"
					type={type === 'password' ? passwordStatus : type}
					value={value}
					onChange={onChange}
					id={id}
					placeholder={placeholder}
					name={name}
				/>
				{type === 'password' && (
					<button
						className="custom-input__button"
						type="button"
						disabled={!value}
						onClick={handleButtonClick}
					>
						{passwordStatus === 'text' && value ? (
							<EyeOpened width={22} height={22} />
						) : (
							<EyeClosed width={22} height={22} />
						)}
					</button>
				)}
			</div>
			{error && <span className="custom-input__error">{error}</span>}
		</div>
	);
};

export { CustomInputField };
