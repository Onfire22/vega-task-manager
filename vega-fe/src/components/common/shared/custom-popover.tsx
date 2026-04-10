import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover.tsx';
import React, { type ReactNode, useRef } from 'react';

interface IProps {
	trigger: ReactNode;
	children: ReactNode;
	width?: string;
	isOpen?: boolean;
	align?: 'center' | 'end' | 'start';
	setIsOpened?: (value: boolean) => void;
}

const CustomPopover: React.FC<IProps> = ({ trigger, children, width, isOpen, setIsOpened, align }) => {
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
				align={align}
				style={{ width }}
				className="min-w-full"
			>
				{children}
			</PopoverContent>
		</Popover>
	);
};

export { CustomPopover };
