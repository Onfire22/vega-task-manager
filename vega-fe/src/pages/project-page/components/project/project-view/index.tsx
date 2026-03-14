import type { IDictionary, IProject } from '../../../types.ts';
import React from 'react';
import { Button, Progress, Tabs } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import './styles.less';
import { SelectWithDot } from '../../../../../ui/select-with-dot';
import { ROLES_COLORS, STATUSES } from '../../../constants.ts';

interface IProps {
	project: IProject | null;
	activeTab: string;
	dictionariesOptions: Array<IDictionary>;
	onTabClick: (tab: string | null) => void;
}

const ProjectView: React.FC<IProps> = ({ project, activeTab, onTabClick, dictionariesOptions }) => {
	if (!project) return null;
	return (
		<div className="project">
			<div className="project__content">
				<div className="project__header">
					<div className="project__avatar" />
					<div className="project__info">
						<div className="project__title">{project?.title}</div>
						<div className="project__meta">
							<span>
								Создан {project?.createdAt} - ID {project?.code}
							</span>
						</div>
					</div>
				</div>
				<div className="project__tabs">
					<Tabs value={activeTab} onChange={onTabClick}>
						<Tabs.List>
							<Tabs.Tab value="description">Описание</Tabs.Tab>
							<Tabs.Tab value="tasks">Задачи</Tabs.Tab>
							<Tabs.Tab value="files">Файлы</Tabs.Tab>
							<Tabs.Tab value="activity">Активность</Tabs.Tab>
						</Tabs.List>
					</Tabs>
				</div>
				<div className="project__data">
					{activeTab === 'description' && <div className="project__data-content">{project?.description}</div>}
				</div>
			</div>
			<aside className="project__sidebar">
				<div className="project__information">
					<div className="project__wrapper">
						<span className="project__subtitle">Статус</span>
						<SelectWithDot
							options={dictionariesOptions}
							value={project.projectStatus.id}
							statuses={STATUSES}
						/>
					</div>
					<div className="project__wrapper">
						<span className="project__subtitle">Дата проекта</span>
						<span className="project__date">{project?.createdAt}</span>
					</div>
					<div className="project__wrapper">
						<span className="project__subtitle">Дедлайн</span>
						<span className={`project__date${project?.deadline ? 'project__date_deadline' : ''}`}>
							{project?.deadline}
						</span>
					</div>
					<div className="project__wrapper">
						<span className="project__subtitle">Прогресс</span>
						<Progress.Root size="xs">
							<Progress.Section value={100}></Progress.Section>
						</Progress.Root>
					</div>
				</div>
				<div className="project__divider" />
				<div className="project__users">
					<div className="project__users-title">
						<span className="project__subtitle">Участники проекта</span>
						<Button size="xs" className="project__button">
							<IconPlus size={10} color="#fff" />
						</Button>
					</div>
					<ul className="project__users-list">
						{project?.users.map((user) => {
							return (
								<li className="project__user" key={user.id}>
									<div className="project__user-avatar" />
									<div className="project__user-info">
										<div className="project__user-header">
											<div className="project__user-name">{user.userName}</div>
											<div
												className="project__user-role"
												style={{
													color: ROLES_COLORS[user.userRole.key as keyof typeof ROLES_COLORS],
												}}
											>
												{user.userRole.label}
											</div>
										</div>
										<div className="project__user-specialisation">{user.userSpecialisation}</div>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</aside>
		</div>
	);
};

export { ProjectView };
