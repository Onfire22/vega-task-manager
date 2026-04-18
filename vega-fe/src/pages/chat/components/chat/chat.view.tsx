import { CustomTextarea } from '@/components/common/forms/custom-textarea.tsx';
import { EllipsisVertical, Send } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import React, { type KeyboardEvent } from 'react';
import type { IMappedMessage } from '@/pages/chat/types.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { CustomTooltip } from '@/components/common/ui/custom-tooltip.tsx';
import { Kbd, KbdGroup } from '@/components/ui/kbd.tsx';
import { isDatesEqual } from '@/pages/chat/utils.ts';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { MESSAGE_MENU } from '@/pages/chat/constants.ts';

interface IProps {
	value: string;
	isLoading: boolean;
	onCreateMessage: () => void;
	onValueChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
	messages: Array<IMappedMessage>;
	activeChannelUuid?: string;
	currentUserUuid?: string;
}

const ChatView: React.FC<IProps> = ({
	onValueChange,
	onCreateMessage,
	value,
	messages,
	isLoading,
	activeChannelUuid,
	onKeyDown,
	currentUserUuid,
}) => {
	return !activeChannelUuid ? (
		<div className="h-[calc(100vh-130px)] flex items-center justify-center">Выберите канал</div>
	) : (
		<div className="p-3 h-[calc(100vh-127px)]">
			<div className="h-[calc(100vh-220px)] overflow-auto scrollbar-custom flex flex-col gap-3 px-2">
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
							<div key={message.id}>
								{messages[index + 1] &&
									!isDatesEqual(message.createdAtDate, messages[index + 1].createdAtDate) && (
										<div className="w-full text-center p-2">
											<div className="text-muted-foreground text-[12px]">
												{messages[index + 1].createdAtDate}
											</div>
										</div>
									)}
								<div className="flex items-center justify-between rounded-[5px] hover:bg-accent px-2 py-1">
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
											</div>
											<div className="text-[14px] whitespace-pre-wrap">{message.text}</div>
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
											{MESSAGE_MENU.map((item) => {
												let isPermitted = true;

												if (item.permission) {
													isPermitted = message.author.id === currentUserUuid;
												}

												return (
													isPermitted && (
														<li
															className="p-1 w-full hover:bg-accent cursor-pointer rounded-[5px]"
															key={item.id}
														>
															{item.text}
														</li>
													)
												);
											})}
										</ul>
									</CustomPopover>
								</div>
							</div>
						);
					})
				) : (
					<div className="h-[calc(100vh-220px)] flex items-center justify-center">Сообщений пока нет</div>
				)}
			</div>
			<CustomTextarea
				value={value}
				onChange={onValueChange}
				onKeyDown={onKeyDown}
				placeholder="Текст сообщения"
				resize="none"
				rightIcon={
					<CustomTooltip
						position="top"
						trigger={
							<Button variant="primary" type="button" onClick={onCreateMessage} disabled={!value.trim()}>
								<Send />
							</Button>
						}
						content={
							<div className="flex flex-col gap-1.25">
								<KbdGroup>
									<Kbd data-icon="inline-end" className="translate-x-0.5">
										⏎
									</Kbd>
									<span> - для отправки сообщения</span>
								</KbdGroup>
								<KbdGroup>
									<Kbd>Ctrl</Kbd>
									<span>+</span>
									<Kbd data-icon="inline-end" className="translate-x-0.5">
										⏎
									</Kbd>
									<span> - для переноса строки</span>
								</KbdGroup>
							</div>
						}
					/>
				}
			/>
		</div>
	);
};

export { ChatView };
