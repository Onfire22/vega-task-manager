import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import React, { type ReactNode } from 'react';

interface IProps {
	activeTab: string;
	variant?: 'line' | 'default' | null;
	triggers: Array<{ text: string; value: string; icon?: ReactNode }>;
	onChange: (value: string) => void;
}

const CustomTabs: React.FC<IProps> = ({ activeTab, variant, triggers, onChange }) => {
	return (
		<Tabs value={activeTab} onValueChange={onChange}>
			<TabsList variant={variant}>
				{triggers.map((item) => {
					return (
						<TabsTrigger value={item.value} key={item.value} className="cursor-pointer after:bg-primary">
							{item.icon && item.icon}
							<span className="text-[13px]">{item.text}</span>
						</TabsTrigger>
					);
				})}
			</TabsList>
		</Tabs>
	);
};

export { CustomTabs };
