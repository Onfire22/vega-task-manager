import React from 'react';
import { CustomTabs } from '@/components/common/custom-tabs.tsx';
import { TABS } from '@/pages/projects-page/constants.ts';

interface IProps {
	onTabClick: (tab: string) => void;
	activeTab: string;
	component: React.ComponentType;
}

const ProjectsView: React.FC<IProps> = ({ activeTab, onTabClick, component: Component }) => {
	return (
		<div className="w-full p-5">
			<div className="flex items-center justify-between mb-2.5">
				<h1 className="text-[18px] font-medium text-white">Проекты</h1>
				<div className="flex items-center justify-between">
					<CustomTabs triggers={TABS} activeTab={activeTab} onChange={onTabClick} />
				</div>
			</div>
			<Component />
		</div>
	);
};

export { ProjectsView };
