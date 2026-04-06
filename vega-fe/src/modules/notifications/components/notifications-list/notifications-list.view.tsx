import type { INotification } from '@/modules/notifications/types.ts';
import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
	notificationsList: Array<INotification>;
}

const NotificationsListView: React.FC<IProps> = ({ notificationsList }) => {
	return (
		<div className="min-h-75 max-h-175 overflow-auto scrollbar-custom">
			{notificationsList.length > 0 ? (
				notificationsList.map((item) => {
					if (item.entity.type === 'task') {
						return (
							<div className="p-2 hover:bg-accent rounded-[5px]" key={item.id}>
								<span>
									Пользователь{' '}
									<Link className="link-styled" to="#">
										{item.user.userName}
									</Link>{' '}
									назначил вас исполнителем в задчу{' '}
									<Link className="link-styled" to={`task/${item.entity.uuid}`}>
										{item.entity.code}
									</Link>
								</span>
							</div>
						);
					}
				})
			) : (
				<div className="w-full flex items-center justify-center text-muted-foreground">
					Уведомлений пока нет
				</div>
			)}
		</div>
	);
};

export { NotificationsListView };
