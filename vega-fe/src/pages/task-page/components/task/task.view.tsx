import React from 'react';
import { BLUE_COLOR, RED_COLOR, TABS, TEAL_COLOR } from '../../constants.ts';
import { ArrowBigRight, Plus } from 'lucide-react';
import type { ITask, TField, TOption, TTaskFields } from '../../types.ts';
import { Comments } from '@/pages/task-page/components/comments/comments.tsx';
import { TaskLogs } from '@/pages/task-page/components/task-logs/task-logs.tsx';
import { Link } from 'react-router-dom';
import { CustomBadge } from '@/components/common/ui/custom-badge.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomTabs } from '@/components/common/ui/custom-tabs.tsx';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { CustomProgress } from '@/components/common/ui/custom-progress.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { MarkdownEditor } from '@/components/common/forms/markdown-editor.tsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface IProps {
	task: ITask | null;
	currentUserId?: string;
	activeTab: string;
	field: TField;
	onSetFieldToEdit: (fieldName: TTaskFields, value: string | null) => void;
	onCancelChanges: () => void;
	onLogWorkModalShown: () => void;
	onUpdateTask: (fieldName: TTaskFields | '', value: string) => void;
	onFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName: TTaskFields): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName: TTaskFields): void;
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
						onChange={(value) => onUpdateTask('taskStatusUuid', value)}
						label="Статус"
					/>
					<CustomSelect
						options={options.taskType}
						value={task.taskStack.id}
						onChange={(value) => onUpdateTask('taskStackUuid', value)}
						label="Тип"
					/>
					<CustomSelect
						options={options.taskPriority}
						value={task.taskPriority.id}
						onChange={(value) => onUpdateTask('taskPriorityUuid', value)}
						label="Приоритет"
					/>
				</div>
				<div className="border-b mb-2.5 max-w-[97%] mx-auto" />
				<div className="mb-5">
					<div className="pl-6.25 text-muted-foreground uppercase text-[11px] mb-2.5">Описание</div>
					{field.fieldName === 'description' ? (
						<div className="px-6.25 mb-5">
							<MarkdownEditor
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
								<div
									className="prose prose-invert max-w-none"
									style={{
										overflowWrap: 'break-word',
										wordBreak: 'break-word',
										overflow: 'hidden',
									}}
								>
									<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
										{task.description}
									</ReactMarkdown>
								</div>
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
					{activeTab === 'logs' && <TaskLogs />}
				</div>
			</div>
			<aside className="w-[40%] min-h-[calc(100vh-53px)] border-l">
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
									<a
										className="link-styled"
										onClick={() => onUpdateTask('assigneeUuid', currentUserId!)}
									>
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
															onClick={() => onUpdateTask('assigneeUuid', user.value)}
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
								<CustomProgress
									progress={task.estimateTimePercents || 0}
									label="Оценка"
									percents={task.estimateTime}
									color={BLUE_COLOR}
									size="h-2"
								/>
								<CustomProgress
									progress={task.totalLoggedTimePercents || 0}
									label="Потрачено"
									percents={task.totalLoggedTime}
									size="h-2"
								/>
								<CustomProgress
									progress={task.remainingTimePercents || 0}
									label="Осталось"
									percents={task.remainingTime}
									color={(task?.remainingTimePercents ?? 0) >= 50 ? TEAL_COLOR : RED_COLOR}
									size="h-2"
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
