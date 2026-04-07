import { NotificationsView } from '@/modules/notifications/components/notifications/notifications.view.tsx';
import { useGetNotificationsQuery } from '@/api/notifiactions/notifiactions.api.ts';

const Notifications = () => {
	useGetNotificationsQuery();

	return <NotificationsView />;
};

export { Notifications };
