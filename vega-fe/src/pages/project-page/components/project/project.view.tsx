import type { IProject } from '../../types.ts';
import React from 'react';
import { TABS } from '../../constants.ts';
import { TasksTable } from '../tasks-table/tasks-table.tsx';
import { CustomTabs } from '@/components/common/ui/custom-tabs.tsx';
import { ProjectSettings } from '@/pages/project-page/components/project-settings/project-settings.tsx';
import { ProjectMembers } from '@/pages/project-page/components/project-members/project-members.tsx';
import { CustomSidebar } from '@/components/common/shared/custom-sidebar.tsx';

interface IProps {
	project: IProject | null;
	activeTab: string;
	onTabClick: (tab: string | null) => void;
}

const ProjectView: React.FC<IProps> = ({ project, activeTab, onTabClick }) => {
	if (!project) return null;
	return (
		<div className="w-full h-full flex items-start">
			<div className="w-full px-3.75 py-2.5">
				<div className="flex items-center gap-2.5 mb-2.5">
					<div
						className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[18px]"
						style={{
							backgroundColor: project.avatar.color,
						}}
					>
						{project.avatar.letters}
					</div>
					<div>
						<div className="text-[20px] text-white">{project.title}</div>
						<div className="text-[12px] text-muted-foreground">
							<span>
								Создан {project.createdAt} - ID {project.code}
							</span>
						</div>
					</div>
				</div>
				<CustomTabs triggers={TABS} activeTab={activeTab} onChange={onTabClick} variant="line" />
				<div className="p-2.5">
					{activeTab === 'description' && <div>{project.description}</div>}
					{activeTab === 'tasks' && <TasksTable />}
				</div>
			</div>
			{/*<aside className="w-[30%] min-h-[calc(100vh-55px)] p-3.75 border flex flex-col gap-5">*/}
			<CustomSidebar>
				<ProjectSettings />
				<div className="h-px bg-border" />
				<ProjectMembers />
			</CustomSidebar>
			{/*</aside>*/}
		</div>
	);
};

export { ProjectView };
