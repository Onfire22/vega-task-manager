import { Spinner } from '@/components/ui/spinner.tsx';
import { cn } from '@/lib/utils.ts';
import React from 'react';

interface IProps {
	size?: string;
	isFull?: boolean;
}

const CustomLoader: React.FC<IProps> = ({ size, isFull = false }) => {
	if (isFull) {
		return (
			<div className="w-full h-screen flex-centered-line absolute backdrop-blur-[2px]">
				<Spinner className="size-20 text-primary" />
			</div>
		);
	}

	return (
		<Spinner
			className={cn(
				size === 'xxl' && 'size-20',
				size === 'xl' && 'size-15',
				size === 'm' && 'size-10',
				size === 's' && 'size-8',
				size === 'xs' && 'size-5',
				size === 'xxs' && 'size-3',
				'text-primary',
			)}
		/>
	);
};

export { CustomLoader };
