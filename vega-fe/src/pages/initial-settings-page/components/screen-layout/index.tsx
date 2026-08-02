import React, { type ReactNode } from 'react';
import { Button } from '@/components/ui/button.tsx';

interface IProps {
	title: string;
	buttonText: string;
	disabled?: boolean;
	children: ReactNode;
	icon?: ReactNode;
	onButtonClick: () => void;
}

const ScreenLayout: React.FC<IProps> = ({ title, children, buttonText, icon, onButtonClick, disabled }) => {
	return (
		<div className="h-screen flex flex-col justify-between p-5">
			<h1 className="text-4xl text-center animate-in fade-in fill-mode-both duration-700 delay-200">{title}</h1>
			<div className="flex flex-col justify-center p-5">{children}</div>
			<Button
				className="rounded-[5px] p-5 self-end animate-in fade-in fill-mode-both duration-700 delay-400"
				variant="primary"
				type="button"
				onClick={onButtonClick}
				disabled={disabled}
			>
				<span>{buttonText}</span>
				{icon}
			</Button>
		</div>
	);
};

export { ScreenLayout };
