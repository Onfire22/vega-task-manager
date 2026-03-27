import type { IProject } from '../../../types.ts';
import React from 'react';
import { pluralValue } from '../../../utils.ts';
import { PLURAL_OPTIONS } from '../../../constants.ts';
import { getAvatarColor } from '../../../../../app/utils.ts';
import { CustomBadge } from '@/components/common/ui/custom-badge.tsx';
import { CustomProgress } from '@/components/common/ui/custom-progress.tsx';

interface IProps {
	projects: IProject[];
	onCardClick: (uuid: string) => void;
}

const ProjectsCardsView: React.FC<IProps> = ({ projects, onCardClick }) => {
	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.75 mt-2.5">
			{projects.map((project) => {
				return (
					<article
						key={project.id}
						className="text-[14px] p-3.75 bg--sidebar flex flex-col gap-2.5
            border border-accent rounded-[10px] cursor-pointer
            transition-colors duration-300 hover:bg-card"
						onClick={() => onCardClick(project.id)}
					>
						<div className="flex items-center gap-2.5">
							<div
								className="w-7.5 h-7.5 rounded-[5px] flex items-center justify-center"
								style={{
									backgroundColor: getAvatarColor(project.id),
								}}
							>
								{project.code.substring(1, 3)}
							</div>
							<div className="projects-cards__info">
								<div className="text-white">{project.title}</div>
								<div className="text-[12px] text-muted-foreground">{project.code}</div>
							</div>
						</div>
						<div className="text-[12px] text-muted-foreground flex items-center justify-between">
							<div>{project.owner}</div>
							<div>{project.createdAt}</div>
						</div>
						<CustomProgress progress={project.projectProgress} />
						<div className="text-[12px] text-muted-foreground flex items-center justify-between">
							<div>{`${project.tasksCount} ${pluralValue(project.tasksCount, PLURAL_OPTIONS)}`}</div>
							<div className="w-25">
								<CustomBadge label={project.projectStatus.key} text={project.projectStatus.label} />
							</div>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export { ProjectsCardsView };
