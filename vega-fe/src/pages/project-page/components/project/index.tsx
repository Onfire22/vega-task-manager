import { ProjectView } from './project-view';
import { useProjectData } from '../../hooks.ts';
import { useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { useState } from 'react';
import { useUsersOptions } from '../../../../api/hooks.ts';

const Project = () => {
	const params = useParams();
	const [activeField, setActiveField] = useState<{ fieldName: string; value: string | null }>({
		fieldName: '',
		value: '',
	});

	const [activeTab, setActiveTab] = useState('description');
	const { usersListOptions } = useUsersOptions();

	const { project, isProjectLoading, dictionariesOptions, projectProgress } = useProjectData(params.uuid);

	const handleTabClick = (tab: string | null) => {
		if (tab) {
			setActiveTab(tab);
		}
	};

	const handleSetActiveFiled = (fieldName: string, value: string | null) => {
		setActiveField({ fieldName, value });
	};

	return isProjectLoading ? (
		<Loader />
	) : (
		<ProjectView
			project={project}
			activeTab={activeTab}
			dictionariesOptions={dictionariesOptions.projectStatus}
			projectProgress={projectProgress}
			usersListOptions={usersListOptions}
			activeField={activeField}
			onTabClick={handleTabClick}
			onSetActiveFiled={handleSetActiveFiled}
		/>
	);
};

export { Project };
