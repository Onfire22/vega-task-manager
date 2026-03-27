import React from 'react';
import { TABS } from '../../constants.ts';
import { ArrowBigRight, Plus } from 'lucide-react';
import type { ITask, TOption } from '../../types.ts';
import { Comments } from '../../comments';
import { TaskLogs } from '../../task-logs';
import { Link } from 'react-router-dom';
import { CustomBadge } from '@/components/common/ui/custom-badge.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { CustomTabs } from '@/components/common/ui/custom-tabs.tsx';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { CustomProgress } from '@/components/common/ui/custom-progress.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';

interface IProps {
	task: ITask | null;
	currentUserId?: string;
	activeTab: string;
	field: { fieldName: string; value: string };
	onSetFieldToEdit: (fieldName: string, value: string | null) => void;
	onCancelChanges: () => void;
	onLogWorkModalShown: () => void;
	onUpdateTask: (fieldName: string, value: string) => void;
	onFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName: string): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName: string): void;
	};
	options: { taskType: Array<TOption>; taskPriority: Array<TOption>; taskStatus: Array<TOption> };
	usersListOptions: Array<{ label: string; value: string }>;
	onSetActiveTab: (value: string) => void;
}

const TaskView: React.FC<IProps> = ({
	task,
	field,
	onSetFieldToEdit,
	onFieldChange,
	options,
	onCancelChanges,
	onLogWorkModalShown,
	usersListOptions,
	onUpdateTask,
	currentUserId,
	onSetActiveTab,
	activeTab,
}) => {
	if (!task) return null;
	return (
		<div className="flex items-start w-full">
			<div className="w-full py-2.5">
				<div className="px-6.25 flex items-center gap-1.25 text-[13px] mb-1.25">
					<Link
						className="transition-colors duration-300 hover:text-white"
						to={`/project/${task.project.id}`}
					>
						project {task.project.code}
					</Link>
					<ArrowBigRight size={15} />
					<Link
						className="transition-colors duration-300 hover:text-white"
						state={{ from: location.pathname }}
						to={`/project/${task.project.id}`}
					>
						задачи
					</Link>
					<ArrowBigRight size={15} />
					<span>{task.code}</span>
				</div>
				{field.fieldName === 'title' ? (
					<div className="px-6.25">
						<CustomInput
							type="text"
							value={field.value}
							onChange={(e) => {
								onFieldChange(e, 'title');
							}}
						/>
						<div className="mt-2.5 mb-2.5 flex items-center gap-1.25">
							<Button
								variant="primary"
								size="xs"
								onClick={() => {
									onUpdateTask(field.fieldName, field.value);
								}}
							>
								Сохранить
							</Button>
							<Button size="xs" onClick={onCancelChanges}>
								Отмена
							</Button>
						</div>
					</div>
				) : (
					<div className="px-6.25">
						<div
							className="text-[18px] text-white mb-4 cursor-text hover:pl-0.75 hover:rounded-[5px] hover:outline-1 hover:bg-accent hover:outline-border"
							onClick={() => {
								onSetFieldToEdit('title', task.title);
							}}
						>
							{task.title}
						</div>
					</div>
				)}
				<div className="px-6.25 pb-4 flex items-center gap-2.5">
					<CustomSelect
						options={options?.taskStatus}
						value={task.taskStatus.id}
						onChange={(value) => onUpdateTask('taskStatus', value)}
						label="Статус"
					/>
					<CustomSelect
						options={options.taskType}
						value={task.taskStack.id}
						onChange={(value) => onUpdateTask('taskStack', value)}
						label="Тип"
					/>
					<CustomSelect
						options={options.taskPriority}
						value={task.taskPriority.id}
						onChange={(value) => onUpdateTask('taskPriority', value)}
						label="Приоритет"
					/>
				</div>
				<div className="border-b mb-2.5 max-w-[97%] mx-auto" />
				<div className="mb-5">
					<div className="pl-6.25 text-muted-foreground uppercase text-[11px] mb-2.5">Описание</div>
					{field.fieldName === 'description' ? (
						<div className="px-6.25 mb-5">
							<Textarea
								value={field.value}
								onChange={(e) => {
									onFieldChange(e, 'description');
								}}
							/>
							<div className="mt-2.5 flex items-center gap-1.25">
								<Button
									size="xs"
									variant="primary"
									onClick={() => {
										onUpdateTask(field.fieldName, field.value);
									}}
								>
									Сохранить
								</Button>
								<Button size="xs" onClick={onCancelChanges}>
									Отмена
								</Button>
							</div>
						</div>
					) : (
						<div className="px-6.25">
							<div
								className="cursor-text hover:pl-0.75 hover:rounded-[5px] hover:outline-1 hover:bg-accent hover:outline-border"
								onClick={() => {
									onSetFieldToEdit('description', task.description);
								}}
							>
								{task.description}
							</div>
						</div>
					)}
				</div>
				<div className="border-b mb-2.5 max-w-[97%] mx-auto" />
				<div className="pl-6.25">
					<CustomTabs variant="line" triggers={TABS} activeTab={activeTab} onChange={onSetActiveTab} />
				</div>
				<div className="p-6.25">
					{activeTab === 'comments' && <Comments />}
					{activeTab === 'logs' && <TaskLogs logs={task.timeLogs} />}
				</div>
			</div>
			<aside className="w-[30%] h-full border-l">
				<div className="border-b">
					<div className="p-3.75">
						<div className="text-muted-foreground uppercase text-[11px] mb-2.5">Описание</div>
						<div className="flex items-center justify-between">
							<div className="text-[12px]">Автор</div>
							<div className="text-[14px]">{task.reporter}</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-[12px]">Исполнитель</div>
							<div className="text-[14px]">
								{task.assignee ? (
									<span>{task.assignee}</span>
								) : (
									<a className="link-styled" onClick={() => onUpdateTask('assignee', currentUserId!)}>
										+ назначить меня
									</a>
								)}
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-[12px]" />
							<div className="text-[14px]">
								<CustomPopover
									trigger={<a className="link-styled">+ назначить</a>}
									content={
										<>
											<CustomInput
												placeholder="Поиск"
												type="text"
												value="123"
												onChange={() => {}}
											/>
											<ul className="mt-2.5">
												{usersListOptions.map((user) => {
													return (
														<li
															className="cursor-pointer text-[14px] p-1.25 hover:bg-secondary rounded-[5px]"
															key={user.value}
															onClick={() => onUpdateTask('assignee', user.value)}
														>
															{user.label}
														</li>
													);
												})}
											</ul>
										</>
									}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="border-b">
					<div className="p-3.75">
						<div className="text-muted-foreground uppercase text-[11px] mb-2.5">Даты</div>
						<div className="flex items-center justify-between">
							<div className="text-[12px]">Создано</div>
							<div className="text-[14px]">09.03.2026</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-[12px]">Обновлено</div>
							<div className="text-[14px]">10.03.2026</div>
						</div>
					</div>
				</div>
				<div className="border-b">
					<div className="p-3.75">
						<div className="text-muted-foreground uppercase text-[11px] mb-2.5">Учёт времени</div>
						{(task.estimateTime || task.totalLoggedTime) && (
							<div className="flex flex-col gap-2.5 mb-3.75">
								<div className="flex items-center justify-between">
									<span className="text-[12px]">Оценка</span>
									<span className="text-[12px]">{task.estimateTime}</span>
								</div>
								<CustomProgress
									progress={task.loggedPercents}
									label="Потрачено"
									percents={task.totalLoggedTime}
								/>
								<CustomProgress
									progress={task.remainingPercents}
									label="Осталось"
									percents={task.remainingTime}
									color={task.remainingPercents >= 50 ? 'bg-teal' : 'bg-danger'}
								/>
							</div>
						)}
						<div className="w-full flex justify-center">
							<Button onClick={onLogWorkModalShown}>
								<Plus size={18} />
								{task.estimateTime ? <span>Записать время</span> : <span>Оценить задачу</span>}
							</Button>
						</div>
					</div>
				</div>
				<div className="border-b">
					<div className="p-3.75">
						<div className="text-muted-foreground uppercase text-[11px] mb-2.5">Проект</div>
						<div className="flex items-center justify-between">
							<div className="text-[12px]">Код</div>
							<div className="text-[14px]">{task.project.code}</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-[12px]">Статус</div>
							<div className="text-[14px]">
								<CustomBadge
									label={task.project.projectStatus.key}
									text={task.project.projectStatus.label}
								/>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export { TaskView };
