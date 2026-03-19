import type { IProject } from '../../../types.ts';
import React from 'react';
import { Progress } from '@mantine/core';
import './styles.less';
import { pluralValue } from '../../../utils.ts';
import { PLURAL_OPTIONS } from '../../../constants.ts';
import { CustomBadge } from '../../../../../components/custom-badge';

interface IProps {
	projects: IProject[];
	onCardClick: (uuid: string) => void;
}

const ProjectsCardsView: React.FC<IProps> = ({ projects, onCardClick }) => {
	return (
		<div className="projects-cards">
			{projects.map((project) => {
				return (
					<article key={project.id} className="projects-cards__card" onClick={() => onCardClick(project.id)}>
						<div className="projects-cards__header">
							<div className="projects-cards__avatar">IT</div>
							<div className="projects-cards__info">
								<div className="projects-cards__title">{project.title}</div>
								<div className="projects-cards__code">{project.code}</div>
							</div>
						</div>
						<div className="projects-cards__conetnt">
							<div className="projects-cards__owner">{project.owner}</div>
							<div className="projects-cards__date">{project.createdAt}</div>
						</div>
						<Progress value={project.projectProgress} size="xs" />
						<div className="projects-cards__conetnt">
							<div className="projects-cards__tasks">
								{`${project.tasksCount} ${pluralValue(project.tasksCount, PLURAL_OPTIONS)}`}
							</div>
							<CustomBadge
								label={project.projectStatus.key}
								text={project.projectStatus.label}
								isFullWidth={false}
							/>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export { ProjectsCardsView };
