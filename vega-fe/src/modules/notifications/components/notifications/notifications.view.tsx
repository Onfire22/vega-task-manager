import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { NotificationsTrigger } from '@/modules/notifications/components/notifications-trigger/notifications-trigger.tsx';
import { NotificationsList } from '@/modules/notifications/components/notifications-list/notifications-list.tsx';

const NotificationsView = () => {
	return (
		<div>
			<CustomPopover trigger={<NotificationsTrigger />} content={<NotificationsList />} align="end" />
		</div>
	);
};

export { NotificationsView };
