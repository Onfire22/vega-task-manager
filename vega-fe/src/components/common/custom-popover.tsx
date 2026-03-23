import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import React, { type ReactNode, useRef } from 'react';

interface IProps {
	trigger: ReactNode;
	content: ReactNode;
	width: string;
	isOpen?: boolean;
	setIsOpened?: (value: boolean) => void;
}

const CustomPopover: React.FC<IProps> = ({ trigger, content, width, isOpen, setIsOpened }) => {
	const triggerRef = useRef<HTMLDivElement>(null);

	const isOpened = isOpen !== undefined ? { open: isOpen } : {};

	const handleOpen = (value: boolean) => {
		if (setIsOpened) {
			return setIsOpened(value);
		}
	};

	return (
		<Popover {...isOpened}>
			<PopoverTrigger asChild>
				<div ref={triggerRef} onFocusCapture={() => handleOpen(true)}>
					{trigger}
				</div>
			</PopoverTrigger>
			<PopoverContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				onPointerDownOutside={(e) => {
					if (triggerRef.current?.contains(e.target as Node)) return;
					handleOpen(false);
				}}
				onEscapeKeyDown={() => handleOpen(false)}
				align="start"
				style={{ width }}
			>
				{content}
			</PopoverContent>
		</Popover>
	);
};

export { CustomPopover };
