const UserProfileView = () => {
	return (
		<div className="user-profile">
			<div className="user-profile__card">
				<div className="user-profile__header">
					<img className="user-profile__avatar" />
					<div className="user-profile__title">ADMIN ADMIN</div>
				</div>
				<div className="user-profile__info">
					<div className="user-profile__data">
						<div className="user-profile__text">Имя</div>
						<div className="user-profile__text">ADMIN</div>
					</div>
					<div className="user-profile__data">
						<div className="user-profile__text">Фамилия</div>
						<div className="user-profile__text">ADMIN</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { UserProfileView };
