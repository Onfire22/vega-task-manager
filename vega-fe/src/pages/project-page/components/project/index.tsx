import { ProjectView } from './project-view';
import { useProjectData } from '../../hooks.ts';
import { useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { useState } from 'react';

const Project = () => {
	const params = useParams();

	const [activeTab, setActiveTab] = useState('description');

	const { project, isProjectLoading } = useProjectData(params.uuid);

	const handleTabClick = (tab: string | null) => {
		if (tab) {
			setActiveTab(tab);
		}
	};

	return isProjectLoading ? (
		<Loader />
	) : (
		<ProjectView project={project} activeTab={activeTab} onTabClick={handleTabClick} />
	);
};

export { Project };
