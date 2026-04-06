import { NotificationsTriggerView } from './notifications-trigger.view.tsx';
import { useAppSelector } from '@/store/hooks.ts';
import { getNotificationsCountSelector } from '@/modules/notifications/selectors.ts';

const NotificationsTrigger = () => {
	const notificationsCount = useAppSelector(getNotificationsCountSelector());

	return <NotificationsTriggerView notificationsCount={notificationsCount} />;
};

export { NotificationsTrigger };
