import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog.tsx';
import React, { type ReactNode } from 'react';

interface IProps {
	trigger: ReactNode;
	title: string;
	description?: string;
	children: ReactNode;
}

const CustomModal: React.FC<IProps> = ({ trigger, title, description, children }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export { CustomModal };
