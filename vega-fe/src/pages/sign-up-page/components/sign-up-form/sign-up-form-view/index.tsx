import { CustomInputField } from '../../../../../ui/custom-input-field';
import Arrow from '../../../../../assets/icons/arrow.svg?react';
import './styles.less';
import { Popup } from '../../popup';

const SignUpFormView = () => {
	return (
		<div className="wrapper">
			<form className="signup-form">
				<h1 className="signup-title">Регистрация</h1>
				<CustomInputField
					id="email"
					type="email"
					label="Электронная почта"
					value="asd"
					onchange={() => {}}
					error="asdsad"
				/>
				<CustomInputField
					id="password"
					type="password"
					label="Пароль"
					value="asd"
					onchange={() => {}}
					tooltip={<Popup />}
				/>
				<CustomInputField
					id="password-repeat"
					type="password"
					label="Повторите пароль"
					value="asd"
					onchange={() => {}}
				/>
				<button className="signup-form__button">
					<Arrow
						width={40}
						height={40}
						className="signup-form__icon"
					/>
				</button>
			</form>
		</div>
	);
};

export { SignUpFormView };
