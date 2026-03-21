import { Button, PasswordInput, Select, TextInput } from '@mantine/core';
import './styles.less';

const UserProfileView = () => {
	return (
		<div className="user-profile">
			<div className="user-profile__content">
				<div className="user-profile__user">
					<div className="user-profile__avatar" />
					<div className="user-profile__info">
						<div className="user-profile__title">Алексей Смирнов</div>
						<div className="user-profile__description">@a.smirnov · Platform team</div>
						<div className="user-profile__controlls">
							<Button size="xs" className="user-profile__button">
								Загрузить фото
							</Button>
							<Button size="xs" className="user-profile__button">
								Удалить фото
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="user-profile__content">
				<div className="user-profile__wrapper">
					<div className="user-profile__row">
						<div className="user-profile__data">
							<p className="user-profile__key">Личные данные</p>
							<p className="user-profile__value">Отображается в задачах, комментариях и упоминаниях</p>
						</div>
					</div>
					<div className="user-profile__row">
						<div className="user-profile__data">
							<p className="user-profile__key">Имя</p>
						</div>
						<div className="user-profile__control">
							<TextInput size="xs" />
						</div>
					</div>
					<div className="user-profile__row">
						<div className="user-profile__data">
							<p className="user-profile__key">Фамилия</p>
						</div>
						<div className="user-profile__control">
							<TextInput size="xs" />
						</div>
					</div>
					<div className="user-profile__row">
						<div className="user-profile__data">
							<p className="user-profile__key">Должность / роль</p>
						</div>
						<div className="user-profile__control">
							<Select size="xs" />
						</div>
					</div>
					<div className="user-profile__row">
						<div className="user-profile__data">
							<p className="user-profile__key">Команда</p>
						</div>
						<div className="user-profile__control">
							<Select size="xs" />
						</div>
					</div>
					<div className="user-profile__row">
						<div className="user-profile__data">
							<p className="user-profile__key">Часовой пояс</p>
						</div>
						<div className="user-profile__control">
							<Select size="xs" />
						</div>
					</div>
					<div className="user-profile__row">
						<div className="user-profile__save">
							<Button variant="accent">Сохранить</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="user-profile__content">
				<div className="user-profile__wrapper">
					<div className="user-profile__row">
						<div className="user-profile__data">
							<p className="user-profile__key">Пароль</p>
							<p className="user-profile__value">Изменить пароль</p>
						</div>
					</div>
					<div className="user-profile__row">
						<div className="user-profile__data">
							<p className="user-profile__key">Старый пароль</p>
						</div>
						<div className="user-profile__control">
							<PasswordInput size="xs" />
						</div>
					</div>
					<div className="user-profile__row">
						<div className="user-profile__data">
							<p className="user-profile__key">Новый пароль</p>
						</div>
						<div className="user-profile__control">
							<PasswordInput size="xs" />
						</div>
					</div>
					<div className="user-profile__row">
						<div className="user-profile__data">
							<p className="user-profile__key">Повторите пароль</p>
						</div>
						<div className="user-profile__control">
							<PasswordInput size="xs" />
						</div>
					</div>
					<div className="user-profile__row">
						<div className="user-profile__save">
							<Button variant="accent">Изменить пароль</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { UserProfileView };
