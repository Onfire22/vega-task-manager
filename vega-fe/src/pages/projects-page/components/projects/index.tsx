import { ProjectsView } from './projects-view';
import { useState } from 'react';
import { PROJECTS_COMPONENT } from '../../constants.ts';

const Projects = () => {
	const [activeTab, setActiveTab] = useState('table');

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const component = PROJECTS_COMPONENT[activeTab as keyof typeof PROJECTS_COMPONENT];

	return <ProjectsView onTabClick={handleTabClick} activeTab={activeTab} component={component} />;
};

export { Projects };
