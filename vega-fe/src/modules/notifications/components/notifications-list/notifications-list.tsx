import { NotificationsListView } from '@/modules/notifications/components/notifications-list/notifications-list.view.tsx';
import { getNotificationsSelector } from '@/modules/notifications/selectors.ts';
import { useAppSelector } from '@/store/hooks.ts';

const NotificationsList = () => {
	const notifications = useAppSelector(getNotificationsSelector());

	return <NotificationsListView notificationsList={notifications} />;
};

export { NotificationsList };
