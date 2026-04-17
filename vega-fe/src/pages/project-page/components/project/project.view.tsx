import type { IDictionaryWithColor, IProject } from '../../types.ts';
import React from 'react';
import { ROLES_COLORS, TABS, VIEWER_ROLE_UUID } from '../../constants.ts';
import { TasksTable } from '../tasks-table/tasks-table.tsx';
import { parseDate } from '@/app/utils.ts';
import { CustomTabs } from '@/components/common/ui/custom-tabs.tsx';
import { cn } from '@/lib/utils.ts';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { CustomProgress } from '@/components/common/ui/custom-progress.tsx';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomCalendar } from '@/components/common/shared/custom-calendar.tsx';

interface IProps {
	project: IProject | null;
	activeTab: string;
	searchValue: string;
	projectProgress: number;
	usersListOptions: Array<{ label: string; value: string }>;
	dictionariesOptions: Array<IDictionaryWithColor>;
	roleTypeOptions: Array<IDictionaryWithColor>;
	onTabClick: (tab: string | null) => void;
	activeField: { fieldName: string; value: string | null };
	onSetActiveFiled: (fieldName: string, value: string | null) => void;
	onUpdateUserRole: (userUuid: string, userRole: string) => void;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onProjectFieldChange: (fieldName: 'deadlineDate' | 'projectStatusUuid', value: string | Date) => void;
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
	onProjectFieldChange,
	onUpdateUserRole,
	roleTypeOptions,
	searchValue,
	onSearchChange,
}) => {
	if (!project) return null;
	return (
		<div className="w-full h-full flex items-start">
			<div className="w-full px-3.75 py-2.5">
				<div className="flex items-center gap-2.5 mb-2.5">
					<div
						className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[18px]"
						style={{
							backgroundColor: project.avatar.color,
						}}
					>
						{project.avatar.letters}
					</div>
					<div>
						<div className="text-[20px] text-white">{project.title}</div>
						<div className="text-[12px] text-muted-foreground">
							<span>
								Создан {project.createdAt} - ID {project.code}
							</span>
						</div>
					</div>
				</div>
				<CustomTabs triggers={TABS} activeTab={activeTab} onChange={onTabClick} variant="line" />
				<div className="p-2.5">
					{activeTab === 'description' && <div>{project.description}</div>}
					{activeTab === 'tasks' && <TasksTable />}
				</div>
			</div>
			<aside className="w-[30%] min-h-[calc(100vh-53px)] p-3.75 border flex flex-col gap-5">
				<div className="flex flex-col gap-5">
					<div className="flex flex-col">
						<span className="text-[11px] uppercase text-muted-foreground tracking-wide flex items-center justify-between">
							Статус
						</span>
						{project.canEdit ? (
							<CustomSelect
								options={dictionariesOptions}
								value={project.projectStatus.id}
								onChange={(value) => onProjectFieldChange('projectStatusUuid', value)}
							/>
						) : (
							<div>{project.projectStatus.label}</div>
						)}
					</div>
					<div className="flex flex-col">
						<span className="text-[11px] uppercase text-muted-foreground tracking-wide flex items-center justify-between">
							Дата проекта
						</span>
						<span className="text-[14px] font-medium">{project.createdAt}</span>
					</div>
					<div className="flex flex-col">
						{activeField.fieldName === 'deadlineDate' ? (
							<div className="flex flex-col gap-2.5">
								<CustomCalendar
									value={parseDate(project.deadlineDate)}
									onChange={(value) => {
										if (!value) return;
										onProjectFieldChange('deadlineDate', value);
									}}
								/>
								<Button onClick={() => onSetActiveFiled('', '')} size="lg">
									Отмена
								</Button>
							</div>
						) : (
							<>
								<span className="text-[11px] uppercase text-muted-foreground tracking-wide flex items-center justify-between">
									<span>Дедлайн</span>
									{project.deadlineDate && project.canEdit ? (
										<a
											className="link-styled"
											onClick={() => onSetActiveFiled('deadlineDate', project.deadlineDate)}
										>
											изменить
										</a>
									) : null}
								</span>
								<span className={cn('font-medium text-[14px]', project.deadlineDate && 'text-danger')}>
									{project.deadlineDate ?? (
										<a
											className="link-styled"
											onClick={() => onSetActiveFiled('deadlineDate', project.deadlineDate)}
										>
											+ установить
										</a>
									)}
								</span>
							</>
						)}
					</div>
					<div className="flex flex-col">
						<span className="text-[11px] uppercase text-muted-foreground tracking-wide flex items-center justify-between">
							Прогресс
						</span>
						<CustomProgress progress={projectProgress} />
					</div>
				</div>
				<div className="h-px bg-border" />
				<div>
					<div className="flex items-center justify-between">
						<span className="text-[11px] uppercase text-muted-foreground tracking-wide flex items-center justify-between">
							Участники проекта
						</span>
						{project.canEdit && (
							<CustomPopover
								align="end"
								trigger={
									<Button size="xs" className="p-0 w-7.5 h-5 text-white">
										+
									</Button>
								}
							>
								<CustomInput
									placeholder="Поиск"
									value={searchValue}
									onChange={onSearchChange}
									type="text"
								/>
								{!usersListOptions.length ? (
									<div className="text-center">Ничего не найдено</div>
								) : (
									<ul className="mt-2.5">
										{usersListOptions.map((user) => {
											return (
												<li
													className="p-1.25 gap-2.5 text-sm flex items-center justify-between"
													key={user.value}
												>
													<span>{user.label}</span>
													<div className="flex items-center gap-1.75">
														<Button
															onClick={() =>
																onUpdateUserRole(user.value, VIEWER_ROLE_UUID)
															}
														>
															+ Пригласить
														</Button>
													</div>
												</li>
											);
										})}
									</ul>
								)}
							</CustomPopover>
						)}
					</div>
					<ul className="mt-2.5">
						{project.users.map((user) => {
							return (
								<li className="p-1.25 text-sm flex items-center gap-2.5" key={user.id}>
									<div
										className="w-7.5 h-6.25 text-[11px] text-white flex items-center justify-center rounded-full"
										style={{ backgroundColor: user.color }}
									>
										{user.userInitials}
									</div>
									<div className="w-full text-[11px] text-muted-foreground">
										<div className="flex items-center justify-between gap-1">
											<div className="flex flex-col flex-1 min-w-0">
												<div className="text-[12px] text-foreground truncate">
													{user.userName}
												</div>
												<div className="truncate">{user.userSpecialisation}</div>
											</div>
											{project.canEdit ? (
												<div className="w-35 shrink-0">
													<CustomSelect
														options={roleTypeOptions}
														value={user.userRole.id}
														onChange={(value) => {
															onUpdateUserRole(user.id, value);
														}}
														size="sm"
													/>
												</div>
											) : (
												<span
													style={{
														color: ROLES_COLORS[
															user.userRole.key as keyof typeof ROLES_COLORS
														],
													}}
												>
													{user.userRole.label}
												</span>
											)}
										</div>
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
