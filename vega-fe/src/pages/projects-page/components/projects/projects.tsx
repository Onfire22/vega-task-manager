import { ProjectsView } from './projects.view.tsx';
import { useState } from 'react';
import { ProjectsTable } from '../projects-table/projects-table.tsx';
import { ProjectsCards } from '../projects-cards/projects-cards.tsx';
import { useAppDispatch } from '@/store/hooks.ts';
import { setPagination } from '@/pages/projects-page/slice.ts';
import { CARDS_PAGINATION, TABLE_PAGINATION } from '@/pages/projects-page/constants.ts';

const PROJECTS_COMPONENT = {
	table: ProjectsTable,
	cards: ProjectsCards,
};

const Projects = () => {
	const dispatch = useAppDispatch();
	const [activeTab, setActiveTab] = useState('table');

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
		if (tab === 'cards') {
			dispatch(setPagination(CARDS_PAGINATION));
		} else {
			dispatch(setPagination(TABLE_PAGINATION));
		}
	};

	const component = PROJECTS_COMPONENT[activeTab as keyof typeof PROJECTS_COMPONENT];

	return <ProjectsView onTabClick={handleTabClick} activeTab={activeTab} component={component} />;
};

export { Projects };
