import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import type { IChannelsGroups, TNewChatModal } from '@/pages/chat/types.ts';
import React from 'react';
import { cn } from '@/lib/utils.ts';

interface IProps {
	onOpenModal: (modalType: TNewChatModal) => void;
	onSetActiveChannel: (id: string) => void;
	channels: IChannelsGroups;
	activeChannelUuid: string | null;
}

const SidebarView: React.FC<IProps> = ({ onOpenModal, onSetActiveChannel, channels, activeChannelUuid }) => {
	return (
		<div className="w-[23%]">
			<div className="max-h-[calc(100vh-75px)] overflow-auto scrollbar-custom">
				<div className="flex items-center justify-between border-b px-3 py-2">
					<span>Чат</span>
				</div>
				<div className="px-3 py-2 border-b">
					<CustomInput type="text" value="" onChange={() => {}} placeholder="Поиск каналов" />
				</div>
				<div className="px-3 py-2">
					<div className="mb-2">
						<div className="text-muted-foreground text-[12px] uppercase flex items-center justify-between mb-2">
							<span>Каналы</span>
							<Button size="icon-xs" className="text-white" onClick={() => onOpenModal('CHANNEL')}>
								+
							</Button>
						</div>
						{channels.channel.map((item) => {
							return (
								<div
									key={item.id}
									className={cn(
										'py-2.5 px-1.25 flex items-center justify-between rounded-[5px] hover:bg-accent cursor-pointer transition-bg duration-300',
										activeChannelUuid === item.id && 'bg-accent',
									)}
									onClick={() => onSetActiveChannel(item.id)}
								>
									<div>{`#${item.title}`}</div>
									<div className="px-1.5 text-white bg-violet rounded-full text-[12px]">10</div>
								</div>
							);
						})}
					</div>
					<div>
						<div className="text-muted-foreground text-[12px] uppercase flex items-center justify-between mb-2">
							<span>Личные сообщения</span>
							<Button size="icon-xs" className="text-white">
								+
							</Button>
						</div>
						<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent cursor-pointer">
							<div className="flex items-center gap-2">
								<div className="w-[25px] h-[25px] bg-white rounded-full" />
								<div>Иванов Иван</div>
							</div>
							<div className="px-[6px] text-white bg-violet rounded-full text-[12px]">13</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { SidebarView };
