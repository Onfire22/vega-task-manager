import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import React, { type ElementType } from 'react';

interface IProps {
	activeTab: string;
	variant?: 'line' | 'default' | null;
	triggers: Array<{ text: string; value: string; icon?: ElementType }>;
	onChange: (value: string) => void;
}

const CustomTabs: React.FC<IProps> = ({ activeTab, variant, triggers, onChange }) => {
	return (
		<Tabs value={activeTab} onValueChange={onChange}>
			<TabsList variant={variant}>
				{triggers.map((item) => {
					const Icon = item?.icon;
					return (
						<TabsTrigger value={item.value} key={item.value} className="cursor-pointer after:bg-primary">
							{Icon && <Icon />}
							<span className="text-[13px]">{item.text}</span>
						</TabsTrigger>
					);
				})}
			</TabsList>
		</Tabs>
	);
};

export { CustomTabs };
