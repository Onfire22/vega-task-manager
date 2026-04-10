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
					return (
						<div className="p-2 hover:bg-accent rounded-[5px]" key={item.id}>
							<div className="text-muted-foreground text-[12px]">{item.createdAt}</div>
							<span>
								Пользователь{' '}
								<Link className="link-styled" to={`user/${item.user.uuid}`}>
									{`@${item.user.userName}`}
								</Link>{' '}
								{item.entity.type === 'TASK' && (
									<>
										назначил вас исполнителем в задчу{' '}
										<Link className="link-styled" to={`task/${item.entity.uuid}`}>
											{item.entity.code}
										</Link>
									</>
								)}
								{item.entity.type === 'TASK_STATUS' && (
									<>
										изменил статус задачи{' '}
										<Link className="link-styled" to={`task/${item.entity.uuid}`}>
											{item.entity.code}
										</Link>
										на
										<span>{` "${item.extraData}"`}</span>
									</>
								)}
								{item.entity.type === 'PROJECT' && (
									<>
										изменил ваш статус в проекте{' '}
										<Link className="link-styled" to={`project/${item.entity.uuid}`}>
											{item.entity.code}{' '}
										</Link>
										на
										<span>{` "${item.extraData}"`}</span>
									</>
								)}
							</span>
						</div>
					);
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
