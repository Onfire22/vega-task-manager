import { Button } from '@/components/ui/button.tsx';
import React from 'react';

interface IProps {
	userData: {
		userName: string;
		name: string;
		initials: string;
		avatar: string;
	};
}

const UserInfoView: React.FC<IProps> = ({ userData }) => {
	return (
		<div className="bg-card rounded-lg">
			<div className="flex items-center gap-5 px-4.5 py-5">
				<div
					className="w-15 h-15 rounded-full flex items-center justify-center text-white"
					style={{ background: userData.avatar }}
				>
					{userData.initials}
				</div>
				<div>
					<div className="text-white">{userData.name}</div>
					<div className="text-[12px] text-muted-foreground">{userData.userName}</div>
					<div className="-ml-1.25">
						<Button size="xs" variant="default">
							Загрузить фото
						</Button>
						<Button size="xs" variant="default">
							Удалить фото
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { UserInfoView };
