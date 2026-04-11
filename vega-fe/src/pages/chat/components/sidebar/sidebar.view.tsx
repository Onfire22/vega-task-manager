import { Button } from '@/components/ui/button.tsx';
import { Plus } from 'lucide-react';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';

const SidebarView = () => {
	return (
		<div className="w-[23%]">
			<div className="max-h-[calc(100vh-75px)] overflow-auto scrollbar-custom">
				<div className="flex items-center justify-between border-b px-3 py-2">
					<span>Чат</span>
					<Button>
						<Plus />
					</Button>
				</div>
				<div className="px-3 py-2 border-b">
					<CustomInput type="text" value="" onChange={() => {}} placeholder="Поиск каналов" />
				</div>
				<div className="px-3 py-2">
					<div className="mb-2">
						<div className="text-muted-foreground text-[12px] uppercase">Каналы</div>
						<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent cursor-pointer">
							<div>#Проект 2</div>
							<div className="px-[6px] text-white bg-violet rounded-full">10</div>
						</div>
					</div>
					<div>
						<div className="text-muted-foreground text-[12px] uppercase">Личные сообщения</div>
						<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent cursor-pointer">
							<div className="flex items-center gap-2">
								<div className="w-[25px] h-[25px] bg-white rounded-full" />
								<div>Иванов Иван</div>
							</div>
							<div className="px-[6px] text-white bg-violet rounded-full">10</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { SidebarView };
