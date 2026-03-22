import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import React, { type ReactNode, useRef } from 'react';

interface IProps {
	trigger: ReactNode;
	content: ReactNode;
	width: string;
	isOpen: boolean;
	setIsOpened: (value: boolean) => void;
}

const CustomPopover: React.FC<IProps> = ({ trigger, content, width, isOpen, setIsOpened }) => {
	const triggerRef = useRef<HTMLDivElement>(null);

	return (
		<Popover open={isOpen}>
			<PopoverTrigger asChild>
				<div ref={triggerRef} onFocusCapture={() => setIsOpened(true)}>
					{trigger}
				</div>
			</PopoverTrigger>
			<PopoverContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				onPointerDownOutside={(e) => {
					if (triggerRef.current?.contains(e.target as Node)) return;
					setIsOpened(false);
				}}
				onEscapeKeyDown={() => setIsOpened(false)}
				align="start"
				style={{ width }}
			>
				{content}
			</PopoverContent>
		</Popover>
	);
};

export { CustomPopover };
