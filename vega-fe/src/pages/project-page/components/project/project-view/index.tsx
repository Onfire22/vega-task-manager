import type { IDictionary, IProject } from '../../../types.ts';
import React from 'react';
import { Button, Popover, Progress, Tabs, TextInput, Tooltip } from '@mantine/core';
import './styles.less';
import { SelectWithDot } from '../../../../../ui/select-with-dot';
import { ROLES_COLORS, STATUSES } from '../../../constants.ts';
import { TasksTable } from '../../tasks-table';
import { IconUserCheck, IconUserExclamation, IconUserPlus } from '@tabler/icons-react';
import { DatePicker, DatesProvider } from '@mantine/dates';
import { parseDate } from '../../../utils.ts';
import 'dayjs/locale/ru';

interface IProps {
	project: IProject | null;
	activeTab: string;
	projectProgress: number;
	usersListOptions: Array<{ label: string; value: string }>;
	dictionariesOptions: Array<IDictionary>;
	onTabClick: (tab: string | null) => void;
	activeField: { fieldName: string; value: string | null };
	onSetActiveFiled: (fieldName: string, value: string | null) => void;
}

const ProjectView: React.FC<IProps> = ({
	project,
	activeTab,
	onTabClick,
	dictionariesOptions,
	projectProgress,
	usersListOptions,
	activeField,
	onSetActiveFiled,
}) => {
	if (!project) return null;
	return (
		<div className="project">
			<div className="project__content">
				<div className="project__header">
					<div className="project__avatar" />
					<div className="project__info">
						<div className="project__title">{project.title}</div>
						<div className="project__meta">
							<span>
								Создан {project.createdAt} - ID {project.code}
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
					{activeTab === 'description' && <div className="project__data-content">{project.description}</div>}
					{activeTab === 'tasks' && <TasksTable />}
				</div>
			</div>
			<aside className="project__sidebar">
				<div className="project__information">
					<div className="project__wrapper">
						<span className="project__subtitle">Статус</span>
						<SelectWithDot
							options={dictionariesOptions}
							value={project.projectStatus}
							statuses={STATUSES}
							onChange={(value) => {
								if (!value) return;
							}}
						/>
					</div>
					<div className="project__wrapper">
						<span className="project__subtitle">Дата проекта</span>
						<span className="project__date">{project.createdAt}</span>
					</div>
					<div className="project__wrapper">
						{activeField.fieldName === 'deadlineDate' ? (
							<div className="project__calendar">
								<DatesProvider settings={{ locale: 'ru' }}>
									<DatePicker value={parseDate(project.deadlineDate)} />
								</DatesProvider>
								<Button onClick={() => onSetActiveFiled('', '')} size="xs">
									Отмена
								</Button>
							</div>
						) : (
							<>
								<span className="project__subtitle">
									<span>Дедлайн</span>
									{project.deadlineDate ? (
										<a onClick={() => onSetActiveFiled('deadlineDate', project.deadlineDate)}>
											изменить
										</a>
									) : null}
								</span>
								<span
									className={`project__date${project.deadlineDate ? ' project__date_deadline' : ''}`}
								>
									{project.deadlineDate ?? (
										<a onClick={() => onSetActiveFiled('deadlineDate', project.deadlineDate)}>
											+ установить
										</a>
									)}
								</span>
							</>
						)}
					</div>
					<div className="project__wrapper">
						<span className="project__subtitle">Прогресс</span>
						<Progress.Root size="xs">
							<Progress.Section value={projectProgress}></Progress.Section>
						</Progress.Root>
					</div>
				</div>
				<div className="project__divider" />
				<div className="project__users">
					<div className="project__users-title">
						<span className="project__subtitle">Участники проекта</span>
						<Popover width={260} position="bottom" withArrow>
							<Popover.Target>
								<Button size="xs" className="project__button">
									+
								</Button>
							</Popover.Target>
							<Popover.Dropdown>
								<TextInput placeholder="Поиск" size="xs" />
								<ul className="project__users-list">
									{usersListOptions.map((user) => {
										return (
											<li className="project__user" key={user.value}>
												<span>{user.label}</span>
												<div className="project__user-controls">
													<Tooltip label="Пригласить" className="project__user-control">
														<IconUserPlus size={25} />
													</Tooltip>
													<Tooltip
														label="Сделать участником"
														className="project__user-control"
													>
														<IconUserCheck size={25} />
													</Tooltip>
													<Tooltip
														label="Сделать владельцем"
														className="project__user-control"
													>
														<IconUserExclamation size={25} />
													</Tooltip>
												</div>
											</li>
										);
									})}
								</ul>
							</Popover.Dropdown>
						</Popover>
					</div>
					<ul className="project__users-list">
						{project.users.map((user) => {
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
