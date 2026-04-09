import { NotificationsListView } from '@/modules/notifications/components/notifications-list/notifications-list.view.tsx';
import { getNotificationsSelector } from '@/modules/notifications/selectors.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { useSetNotificationsReadMutation } from '@/api/notifiactions/notifiactions.api.ts';
import { useEffect } from 'react';

const NotificationsList = () => {
	const [setNotificationsReaded] = useSetNotificationsReadMutation();

	useEffect(() => {
		setNotificationsReaded();
	}, [setNotificationsReaded]);

	const notifications = useAppSelector(getNotificationsSelector());

	return <NotificationsListView notificationsList={notifications} />;
};

export { NotificationsList };
