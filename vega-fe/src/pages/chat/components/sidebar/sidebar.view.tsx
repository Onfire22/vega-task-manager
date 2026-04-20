import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import type { IChannelsGroups, TNewChatModal } from '@/pages/chat/types.ts';
import React, { type ChangeEvent } from 'react';
import { cn } from '@/lib/utils.ts';
import { Lock } from 'lucide-react';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';

interface IProps {
	onOpenModal: (modalType: TNewChatModal) => void;
	onSetActiveChannel: (channelUuid: string) => void;
	onSearchChannels: (e: ChangeEvent<HTMLInputElement>) => void;
	channels: IChannelsGroups;
	activeChannelUuid?: string | null;
	searchValue: string;
}

const SidebarView: React.FC<IProps> = ({
	onOpenModal,
	onSetActiveChannel,
	channels,
	activeChannelUuid,
	searchValue,
	onSearchChannels,
}) => {
	return (
		<div className="w-[23%]">
			<div className="max-h-[calc(100vh-75px)] overflow-auto scrollbar-custom">
				<div className="flex items-center justify-between border-b px-3 py-2">
					<span>Чат</span>
				</div>
				<div className="px-3 py-2 border-b">
					<CustomInput
						type="text"
						value={searchValue}
						onChange={onSearchChannels}
						placeholder="Поиск каналов"
					/>
				</div>
				<div className="px-3 py-2">
					<div className="mb-2">
						<div className="text-muted-foreground text-[12px] uppercase flex items-center justify-between mb-2">
							<span>Каналы</span>
							<CustomPopover
								width="180px"
								trigger={
									<Button size="icon-xs" className="text-white">
										+
									</Button>
								}
							>
								<ul className="flex flex-col items-start gap-2.5">
									<li
										className="w-full p-1.25 hover:bg-accent rounded-[5px] cursor-pointer"
										onClick={() => onOpenModal('channel')}
									>
										<span>Создать новый канал</span>
									</li>
									<li
										className="w-full p-1.25 hover:bg-accent rounded-[5px] cursor-pointer"
										onClick={() => onOpenModal('channel_join')}
									>
										<span>Вступить в канал</span>
									</li>
								</ul>
							</CustomPopover>
						</div>
						{channels?.channel?.length ? (
							channels.channel.map((item) => {
								return (
									<div
										key={item.id}
										className={cn(
											'py-2.5 px-1.25 mb-2 flex items-center justify-between rounded-[5px] hover:bg-accent cursor-pointer transition-bg duration-300',
											activeChannelUuid === item.id && 'bg-accent',
										)}
										onClick={() => onSetActiveChannel(item.id)}
									>
										<div className="flex items-center gap-1.5">
											{item.channelVisibility === 'private' && <Lock size={15} color="white" />}
											<div>{item.title}</div>
										</div>
										<div className="px-1.5 text-white bg-violet rounded-full text-[12px]">10</div>
									</div>
								);
							})
						) : (
							<div className="text-muted-foreground text-[14px] text-center">Каналов пока нет</div>
						)}
					</div>
					<div>
						<div className="text-muted-foreground text-[12px] uppercase flex items-center justify-between mb-2">
							<span>Личные сообщения</span>
							{/*<Button size="icon-xs" className="text-white" onClick={() => onOpenModal('pm')}>*/}
							{/*	+*/}
							{/*</Button>*/}
						</div>
						{channels?.pm?.length ? (
							channels.pm.map((item) => {
								return (
									<div
										key={item.id}
										className={cn(
											'py-2.5 px-1.25 mb-2 flex items-center justify-between rounded-[5px] hover:bg-accent cursor-pointer transition-bg duration-300',
											activeChannelUuid === item.id && 'bg-accent',
										)}
										onClick={() => onSetActiveChannel(item.id)}
									>
										<div className="flex items-center gap-2">
											<div className="w-6.25 h-6.25 bg-white rounded-full" />
											<div>{item.title}</div>
										</div>
										<div className="px-1.5 text-white bg-violet rounded-full text-[12px]">10</div>
									</div>
								);
							})
						) : (
							<div className="text-muted-foreground text-[14px] text-center">
								Личных сообщений пока нет
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { SidebarView };
