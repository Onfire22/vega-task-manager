import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Search, User } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button.tsx';

interface IProps {
	isUsersControlsOpen: boolean;
	isButtonDisabled: boolean;
	onUserControlsToggle: () => void;
}

const HeaderView: React.FC<IProps> = ({ onUserControlsToggle, isUsersControlsOpen, isButtonDisabled }) => {
	return (
		<div className="p-3 w-full border-b">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-white">Название канала</p>
					<span className="text-muted-foreground text-[12px]">Открытый канал, </span>
					<span className="text-muted-foreground text-[12px]">7 участников</span>
				</div>
				<div className="flex items-center gap-2">
					<CustomInput
						type="text"
						value=""
						onChange={() => {}}
						placeholder="Поиск в канале"
						leftIcon={<Search />}
					/>
					<Button
						variant={isUsersControlsOpen ? 'primary' : 'default'}
						onClick={onUserControlsToggle}
						disabled={isButtonDisabled}
					>
						<User className="cursor-pointer" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export { HeaderView };
