import { CustomTooltip } from '@/components/common/ui/custom-tooltip.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Send } from 'lucide-react';
import { Kbd, KbdGroup } from '@/components/ui/kbd.tsx';
import { CustomTextarea } from '@/components/common/forms/custom-textarea.tsx';
import React, { type KeyboardEvent } from 'react';

interface IProps {
	value: string;
	onCreateMessage: () => void;
	onValueChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ChatInputView: React.FC<IProps> = ({ value, onValueChange, onKeyDown, onCreateMessage }) => {
	return (
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
	);
};

export { ChatInputView };
