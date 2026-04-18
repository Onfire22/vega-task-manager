import { CustomTextarea } from '@/components/common/forms/custom-textarea.tsx';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import React, { type KeyboardEvent } from 'react';
import type { IMappedMessage } from '@/pages/chat/types.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { CustomTooltip } from '@/components/common/ui/custom-tooltip.tsx';
import { Kbd, KbdGroup } from '@/components/ui/kbd.tsx';

interface IProps {
	value: string;
	isLoading: boolean;
	onCreateMessage: () => void;
	onValueChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
	messages: Array<IMappedMessage>;
	activeChannelUuid?: string;
}

const ChatView: React.FC<IProps> = ({
	onValueChange,
	onCreateMessage,
	value,
	messages,
	isLoading,
	activeChannelUuid,
	onKeyDown,
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
					messages.map((message) => {
						return message.isSystem ? (
							<div className="w-full" key={message.id}>
								<span className="text-muted-foreground">{message.text}</span>
							</div>
						) : (
							<div
								className="flex items-start gap-2 rounded-[5px] hover:bg-accent px-2 py-1"
								key={message.id}
							>
								<div
									className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white"
									style={{ background: message.author.avatar.color }}
								>
									{message.author.avatar.initials}
								</div>
								<div>
									<div className="flex items-center gap-2">
										<div className="text-white">{message.author.name}</div>
										<div className="text-muted-foreground text-[12px]">{message.createdAt}</div>
									</div>
									<div className="text-[14px] whitespace-pre-wrap">{message.text}</div>
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
