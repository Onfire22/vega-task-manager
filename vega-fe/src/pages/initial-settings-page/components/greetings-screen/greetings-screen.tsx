import { Button } from '@/components/ui/button.tsx';
import React from 'react';
import type { TScreenTypes } from '@/pages/initial-settings-page/types.ts';

interface IProps {
	onNextStepClick: (step: TScreenTypes) => void;
}

const GreetingsScreen: React.FC<IProps> = ({ onNextStepClick }) => {
	return (
		<div className="h-screen flex flex-col items-center justify-center gap-15">
			<h1 className="animate-in fade-in fill-mode-both duration-700 delay-100 text-center text-7xl">Привет!</h1>
			<h2 className="animate-in fade-in fill-mode-both duration-700 delay-1000 text-center text-4xl">
				Необходимо произвести первоначальную настройку рабочего окружения.
			</h2>
			<Button
				className="animate-in fade-in fill-mode-both duration-700 delay-2000 text-3xl p-7"
				variant="primary"
				onClick={() => onNextStepClick('company')}
			>
				Начать
			</Button>
		</div>
	);
};

export { GreetingsScreen };
