import { Bell } from 'lucide-react';
import React from 'react';

interface IProps {
	notificationsCount: number;
}

const NotificationsTriggerView: React.FC<IProps> = ({ notificationsCount }) => {
	return (
		<div className="cursor-pointer relative">
			{notificationsCount > 0 && (
				<span className="absolute bg-danger w-3.25 h-3.25 text-white text-[10px] rounded-full top-0 right-3 flex items-center justify-center">
					{notificationsCount}
				</span>
			)}
			<Bell size={20} />
		</div>
	);
};

export { NotificationsTriggerView };
