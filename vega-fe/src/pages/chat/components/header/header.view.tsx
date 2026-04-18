import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Search, User } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import type { IChannelHeaderData } from '@/pages/chat/types.ts';
import { pluralValue } from '@/app/utils.ts';
import { PLURAL_OPTIONS } from '@/pages/chat/constants.ts';

interface IProps {
	isUsersControlsOpen: boolean;
	isButtonDisabled: boolean;
	onUserControlsToggle: () => void;
	headerData: IChannelHeaderData | null;
}

const HeaderView: React.FC<IProps> = ({ onUserControlsToggle, isUsersControlsOpen, isButtonDisabled, headerData }) => {
	return (
		<div className="p-3 w-full border-b min-h-[73px]">
			<div className="flex items-center justify-between">
				{headerData && (
					<div>
						<p className="text-white">{headerData.channelTitle}</p>
						{headerData.channelVisibility && (
							<span className="text-muted-foreground text-[12px]">{`${headerData.channelVisibility} канал, `}</span>
						)}
						<span className="text-muted-foreground text-[12px]">{`${headerData.membersCount} ${pluralValue(headerData.membersCount, PLURAL_OPTIONS)}`}</span>
					</div>
				)}
				<div className="flex items-center gap-2 ml-auto">
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
