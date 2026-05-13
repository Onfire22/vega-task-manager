import { ProjectView } from './project.view.tsx';
import { useProjectData } from '../../hooks.ts';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';

const Project = () => {
	const location = useLocation();

	const [activeTab, setActiveTab] = useState(location.state?.from ? 'tasks' : 'description');

	const { projectData, isProjectLoading } = useProjectData();

	const handleTabClick = (tab: string | null) => {
		if (tab) {
			setActiveTab(tab);
		}
	};

	return isProjectLoading ? (
		<CustomLoader />
	) : (
		<ProjectView project={projectData} activeTab={activeTab} onTabClick={handleTabClick} />
	);
};

export { Project };
