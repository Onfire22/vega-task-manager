import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Search, User } from 'lucide-react';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';

const HeaderView = () => {
	return (
		<div className="p-3 w-full border-b">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-white">Название канала</p>
					<span className="text-muted-foreground text-[12px]">Открытый канал, </span>
					<span className="text-muted-foreground text-[12px]">7 участников</span>
				</div>
				<div className="flex items-center gap-2">
					<CustomPopover trigger={<User />} align="end">
						123
					</CustomPopover>
					<CustomInput type="text" value="" onChange={() => {}} placeholder="Поиск" leftIcon={<Search />} />
				</div>
			</div>
		</div>
	);
};

export { HeaderView };
