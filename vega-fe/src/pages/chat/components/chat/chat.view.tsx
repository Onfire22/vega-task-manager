import { EllipsisVertical, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import React from 'react';
import type { IMappedMessage, IMessage } from '@/pages/chat/types.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { isDatesEqual } from '@/pages/chat/utils.ts';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { ChatInput } from '@/pages/chat/components/chat-input/chat-input.tsx';
import { cn } from '@/lib/utils.ts';
import { CustomTooltip } from '@/components/common/ui/custom-tooltip.tsx';
import { BASE_MESSAGE_MENU, PERMITTED_MESSAGE_MENU } from '@/pages/chat/constants.ts';

interface IProps {
	isLoading: boolean;
	messages: Array<IMappedMessage>;
	pinnedMessages: Array<IMessage>;
	activeChannelUuid: string | null;
	onEditMessage: (action: string, message: IMappedMessage) => void;
	itemRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
	onPinnedMessageClick: (id: string) => void;
}

const ChatView: React.FC<IProps> = ({
	messages,
	isLoading,
	activeChannelUuid,
	onEditMessage,
	pinnedMessages,
	itemRefs,
	onPinnedMessageClick,
}) => {
	return (
		<div>
			{pinnedMessages.length > 0 && (
				<div
					className="py-2 px-4 border-b w-full flex items-center gap-2 cursor-pointer truncate"
					onClick={() => onPinnedMessageClick(pinnedMessages[0].id)}
				>
					<Pin size={15} color="#3b82f6" className="rotate-45" />
					<span>{pinnedMessages[0].text}</span>
				</div>
			)}
			{!activeChannelUuid ? (
				<div className="h-[calc(100vh-130px)] flex items-center justify-center">Выберите канал</div>
			) : (
				<div className="p-3 h-[calc(100vh-167px)]">
					<div className="h-[calc(100vh-260px)] overflow-auto scrollbar-custom flex flex-col gap-3 px-2">
						{isLoading && (
							<div className="h-[calc(100vh-220px)] flex items-center justify-center">
								<CustomLoader size="xxl" />
							</div>
						)}
						{messages.length > 0 ? (
							messages.map((message, index) => {
								return message.isSystem ? (
									<div className="w-full" key={message.id}>
										<span className="text-muted-foreground">{message.text}</span>
									</div>
								) : (
									<div
										key={message.id}
										ref={(el) => {
											itemRefs.current[message.id] = el;
										}}
									>
										{messages[index + 1] &&
											!isDatesEqual(message.createdAtDate, messages[index + 1].createdAtDate) && (
												<div className="w-full text-center p-2">
													<div className="text-muted-foreground text-[12px]">
														{messages[index + 1].createdAtDate}
													</div>
												</div>
											)}
										<div
											className={cn(
												message.isPinned && 'bg-chart-2/15',
												'flex items-center justify-between rounded-[5px] hover:bg-accent px-2 py-1',
											)}
										>
											<div className="flex items-start gap-2">
												<div
													className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white"
													style={{ background: message.author.avatar.color }}
												>
													{message.author.avatar.initials}
												</div>
												<div>
													<div className="flex items-center gap-2">
														<div className="text-white">{message.author.name}</div>
														<div className="text-muted-foreground text-[12px]">
															{message.createdAtTime}
														</div>
														{message.isPinned && (
															<CustomTooltip
																position="top"
																content="Закреплено"
																trigger={
																	<Pin
																		size={13}
																		color="#3b82f6"
																		className="rotate-45"
																	/>
																}
															/>
														)}
													</div>
													<div className="text-[14px] whitespace-pre-wrap">
														{message.text}
													</div>
												</div>
											</div>
											<CustomPopover
												align="end"
												width="130px"
												trigger={
													<Button size="xs">
														<EllipsisVertical />
													</Button>
												}
											>
												<ul className="flex flex-col items-start">
													{(message.canEdit
														? [...BASE_MESSAGE_MENU, ...PERMITTED_MESSAGE_MENU]
														: BASE_MESSAGE_MENU
													).map((item) => {
														return (
															<li
																key={item.id}
																className="p-1 w-full hover:bg-accent cursor-pointer rounded-[5px]"
																onClick={() => onEditMessage(item.id, message)}
															>
																{item.text}
															</li>
														);
													})}
												</ul>
											</CustomPopover>
										</div>
									</div>
								);
							})
						) : (
							<div className="h-[calc(100vh-220px)] flex items-center justify-center">
								Сообщений пока нет
							</div>
						)}
					</div>
					<ChatInput />
				</div>
			)}
		</div>
	);
};

export { ChatView };
