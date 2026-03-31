import { ProjectsView } from './projects.view.tsx';
import { useState } from 'react';
import { ProjectsTable } from '../projects-table/projects-table.tsx';
import { ProjectsCards } from '../projects-cards/projects-cards.tsx';

const PROJECTS_COMPONENT = {
	table: ProjectsTable,
	cards: ProjectsCards,
};

const Projects = () => {
	const [activeTab, setActiveTab] = useState('table');

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const component = PROJECTS_COMPONENT[activeTab as keyof typeof PROJECTS_COMPONENT];

	return <ProjectsView onTabClick={handleTabClick} activeTab={activeTab} component={component} />;
};

export { Projects };
