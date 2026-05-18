import React from 'react';
import { TABS } from '../../constants.ts';
import { ArrowBigRight, Paperclip } from 'lucide-react';
import type { ITask, TField, TModalType, TOption, TTaskFields } from '../../types.ts';
import { Link } from 'react-router-dom';
import { CustomBadge } from '@/components/common/ui/custom-badge.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomTabs } from '@/components/common/ui/custom-tabs.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { MarkdownEditor } from '@/components/common/forms/markdown-editor.tsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { TaskEstimate } from '@/pages/task-page/components/task-estimate/task-estimate.tsx';
import { TaskPersonnel } from '@/pages/task-page/components/task-personnel/task-personnel.tsx';
import { CustomSidebar } from '@/components/common/shared/custom-sidebar.tsx';

interface IProps {
	task: ITask | null;
	activeTab: string;
	field: TField;
	onSetFieldToEdit: (fieldName: TTaskFields, value: string | null) => void;
	onCancelChanges: () => void;
	onModalShown: (modalType: TModalType) => void;
	onUpdateTask: (fieldName: TTaskFields | '', value: string) => void;
	onFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName: TTaskFields): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName: TTaskFields): void;
	};
	options: { taskType: Array<TOption>; taskPriority: Array<TOption>; taskStatus: Array<TOption> };
	onSetActiveTab: (value: string) => void;
	component: React.ComponentType;
}

const TaskView: React.FC<IProps> = ({
	task,
	field,
	onSetFieldToEdit,
	onFieldChange,
	options,
	onCancelChanges,
	onModalShown,
	onUpdateTask,
	onSetActiveTab,
	activeTab,
	component: Component,
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
				<div className="mb-2.5">
					<div className="flex items-center gap-2 mb-2">
						<div className="pl-6.25 text-muted-foreground uppercase text-[11px]">Ссылки</div>
						<Button size="xs" onClick={() => onModalShown('links')}>
							<Paperclip />
						</Button>
					</div>
					<div className="flex flex-col gap-2">
						{task.mrLinks && (
							<div className="flex items-start gap-1">
								<div className="text-muted-foreground uppercase text-[11px] pl-6.25 min-w-18">МР:</div>
								<div className="flex flex-col">
									{task.mrLinks.map((item, index) => {
										return (
											<a key={index} className="link-styled text-[12px]">
												{item}
											</a>
										);
									})}
								</div>
							</div>
						)}
						{task.buildLinks && (
							<div className="flex items-start gap-1">
								<div className="text-muted-foreground uppercase text-[11px] pl-6.25">Сборка:</div>
								<div className="flex flex-col">
									{task.buildLinks.map((item, index) => {
										return (
											<a key={index} className="link-styled text-[12px]">
												{item}
											</a>
										);
									})}
								</div>
							</div>
						)}
					</div>
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
					<Component />
				</div>
			</div>
			<CustomSidebar>
				<TaskPersonnel />
				<div className="border-b">
					<div className="p-3.75">
						<div className="text-muted-foreground uppercase text-[11px] mb-2.5">Даты</div>
						<div className="flex items-center justify-between">
							<div className="text-[12px]">Создано</div>
							<div className="text-[14px]">{task.createdAt}</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-[12px]">Обновлено</div>
							<div className="text-[14px]">{task.updatedAt}</div>
						</div>
					</div>
				</div>
				<TaskEstimate />
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
			</CustomSidebar>
		</div>
	);
};

export { TaskView };
