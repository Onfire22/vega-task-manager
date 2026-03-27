import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog.tsx';
import React, { type ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';

interface IProps {
	trigger?: ReactNode;
	title: string;
	description?: string;
	children: ReactNode;
	isOpen: boolean;
	onOpenChange: () => void;
	size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
	sm: 'max-w-md',
	md: 'max-w-lg',
	lg: 'max-w-2xl',
	xl: 'max-w-4xl',
};

const CustomModal: React.FC<IProps> = ({ trigger, title, description, isOpen, onOpenChange, children, size }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
			<DialogContent className={cn(sizeMap[size ?? 'md'])}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export { CustomModal };
