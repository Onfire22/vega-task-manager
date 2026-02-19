import './styles.less';

const Popup = () => {
	return (
		<div className="popup">
			<p className="popup__title">
				Пароль должен соответствовать требованиям:
			</p>
			<ul className="popup__list">
				<li className="popup__item">Длина более 8 символов</li>
				<li className="popup__item">
					Должен содержать прописные и строчные буквы
				</li>
				<li className="popup__item">
					Должен содержать хотя бы один спец. симовл
				</li>
			</ul>
		</div>
	);
};

export { Popup };
