import { Button } from '@/components/ui/button.tsx';

const UserInfoView = () => {
	return (
		<div className="bg-card rounded-lg">
			<div className="flex items-center gap-5 px-4.5 py-5">
				<div className="w-15 h-15 rounded-full bg-[blueviolet]" />
				<div>
					<div className="text-white">Алексей Смирнов</div>
					<div className="text-[12px] text-muted-foreground">@a.smirnov · Platform team</div>
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
