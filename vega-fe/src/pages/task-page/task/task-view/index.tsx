import './styles.less';
import { Button, Popover, Progress, Select, Tabs, Textarea, TextInput, Timeline } from '@mantine/core';
import type { IDictionary } from '../../../../api/types.ts';
import React from 'react';
import { BULLET_ICONS, GREEN_COLOR, RED_COLOR } from '../../constants.ts';
import { IconCheck, IconMessageCircle, IconPencil, IconClockHour3, IconX } from '@tabler/icons-react';
import type { ITask, TOption } from '../../types.ts';
import { Comments } from '../../comments';
import { TaskLogs } from '../../task-logs';

interface IProps {
	task: ITask | null;
	taskStatuses?: IDictionary[];
	activeTaskStatus: number;
	currentUserId?: string;
	activeTab: string | null;
	field: { fieldName: string; value: string };
	onEditField: (fieldName: string, value: string | null) => void;
	onCancelChanges: () => void;
	onLogWorkModalShown: () => void;
	onUpdateTask: (customField?: { fieldName: string; value: string }) => void;
	onFieldChange: {
		(fieldName: string, e: React.ChangeEvent<HTMLInputElement>): void;
		(fieldName: string, e: React.ChangeEvent<HTMLTextAreaElement>): void;
	};
	options: { type: Array<TOption>; priority: Array<TOption> };
	usersListOptions: Array<TOption>;
	onSetActiveTab: (value: string | null) => void;
}

const TaskView: React.FC<IProps> = ({
	task,
	activeTaskStatus,
	taskStatuses,
	field,
	onEditField,
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
		<div className="task">
			<div className="task__header">
				<div className="task__avatar">
					<img />
				</div>
				<div className="task__info">
					<div className="task__title">
						<div className="task__project">Project / Task_CODE</div>
					</div>
					{field.fieldName === 'title' ? (
						<div className="task__field">
							<TextInput value={field.value} onChange={(e) => onFieldChange('title', e)} size="xs" />
							<IconCheck size={25} color={GREEN_COLOR} onClick={() => onUpdateTask()} />
							<IconX size={25} onClick={onCancelChanges} color={RED_COLOR} />
						</div>
					) : (
						<div className="task__subtitle task__editable-field">
							<p className="task__name">{task.title}</p>
							<IconPencil
								className="task__edit-icon"
								size={18}
								onClick={() => onEditField('title', task.title)}
							/>
						</div>
					)}
				</div>
			</div>
			<div className="task__container">
				<div className="task__content">
					<div className="task__controlls">
						<Button className="task__button" onClick={onLogWorkModalShown}>
							Учет времени
						</Button>
						<Popover width={200} trapFocus position="bottom" withArrow shadow="md">
							<Popover.Target>
								<Button className="task__button">Статус</Button>
							</Popover.Target>
							<Popover.Dropdown>
								<div className="task__dropdown">
									<Timeline active={activeTaskStatus} bulletSize={34} lineWidth={4}>
										{taskStatuses?.map((status) => {
											const Icon = BULLET_ICONS[status.name as keyof typeof BULLET_ICONS];

											return (
												<Timeline.Item
													bullet={
														<button
															className="task__dropdown-button"
															type="button"
															onClick={() =>
																onUpdateTask({
																	fieldName: 'taskStatus',
																	value: status.id,
																})
															}
														>
															<Icon size={20} />
														</button>
													}
													title={status.name}
												>
													test text
												</Timeline.Item>
											);
										})}
									</Timeline>
								</div>
							</Popover.Dropdown>
						</Popover>
					</div>
					<div className="task__details">
						<div className="task__heading">Детали задачи</div>
						<div className="task__description">
							<div className="task__row">
								<span className="task__key">Тип:</span>
								{field.fieldName === 'stackType' ? (
									<div className="task__field">
										<Select
											value={field.value}
											data={options.type}
											size="xs"
											onChange={(value) => {
												if (value) {
													onEditField('stackType', value);
												}
											}}
										/>
										<IconCheck size={25} color={GREEN_COLOR} onClick={() => onUpdateTask()} />
										<IconX size={25} onClick={onCancelChanges} color={RED_COLOR} />
									</div>
								) : (
									<div className="task__subtitle task__editable-field">
										<IconPencil
											className="task__edit-icon"
											size={18}
											onClick={() => onEditField('stackType', task.taskStack.name)}
										/>
									</div>
								)}
							</div>
							<div className="task__row">
								<span className="task__key">Статус:</span>
							</div>
							<div className="task__row">
								<span className="task__key">Приоритет:</span>
								{field.fieldName === 'taskPriority' ? (
									<div className="task__field">
										<Select
											value={field.value}
											data={options.priority}
											size="xs"
											onChange={(value) => {
												if (value) {
													onEditField('taskPriority', value);
												}
											}}
										/>
										<IconCheck size={25} color={GREEN_COLOR} onClick={() => onUpdateTask()} />
										<IconX size={25} onClick={onCancelChanges} color={RED_COLOR} />
									</div>
								) : (
									<div className="task__subtitle task__editable-field">
										<IconPencil
											className="task__edit-icon"
											size={18}
											onClick={() => onEditField('taskPriority', task.taskPriority.name)}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="task__description">
						<div className="task__heading">Описание задачи:</div>
						{field.fieldName === 'description' ? (
							<div className="task__field">
								<Textarea
									className="task__textarea"
									autosize
									resize="vertical"
									value={field.value}
									onChange={(e) => onFieldChange('description', e)}
								/>
								<IconCheck size={25} color={GREEN_COLOR} onClick={() => onUpdateTask()} />
								<IconX size={25} onClick={onCancelChanges} color={RED_COLOR} />
							</div>
						) : (
							<div className="task__subtitle task__editable-field">
								<p className="task__name">{task.description}</p>
								<div className="task__icon">
									<IconPencil
										className="task__edit-icon"
										size={18}
										onClick={() => onEditField('description', task.description)}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
				<aside className="task__sidebar">
					<div className="task__details">
						<div className="task__heading">Сотрудники</div>
						<div className="task__row">
							<span className="task__key">Автор:</span>
							<span className="task__value">{task.reporter}</span>
						</div>
						<div className="task__row">
							<span className="task__key">Испольнитель:</span>
							{field.fieldName === 'assignee' ? (
								<div className="task__field">
									<Select
										value={field.value}
										data={usersListOptions}
										size="xs"
										onChange={(value) => {
											if (value) {
												onEditField('assignee', value);
											}
										}}
									/>
									<IconCheck size={25} color={GREEN_COLOR} onClick={() => onUpdateTask()} />
									<IconX size={25} onClick={onCancelChanges} color={RED_COLOR} />
								</div>
							) : (
								<div className="task__subtitle task__editable-field">
									<p className="task__name">{task.assignee}</p>
									<IconPencil
										className="task__edit-icon"
										size={18}
										onClick={() => onEditField('assignee', task.assignee)}
									/>
								</div>
							)}
						</div>
						<a
							className="task__link"
							onClick={() => onUpdateTask({ fieldName: 'assignee', value: currentUserId! })}
						>
							assign on me
						</a>
					</div>
					<div className="task__details">
						<div className="task__heading">Даты</div>
						<div className="task__row">
							<span className="task__key">Создано:</span>
							<span className="task__value">{task.createdAt}</span>
						</div>
						<div className="task__row">
							<span className="task__key">Обновлено:</span>
							<span className="task__value">{task.updatedAt}</span>
						</div>
					</div>
					{(task.estimateTime || task.timeLogs.length > 0) && (
						<div className="task__details">
							<div className="task__heading">Учет времени</div>
							<div className="task__progress">
								<span className="task__key">Оценка:</span>
								<Progress.Root size="xl">
									<Progress.Section value={100}>
										<Progress.Label>{task.estimateTime}</Progress.Label>
									</Progress.Section>
								</Progress.Root>
							</div>
							<div className="task__progress">
								<span className="task__key">Потрачено:</span>
								<Progress.Root size="xl">
									<Progress.Section value={task.loggedPercents ?? 0}>
										<Progress.Label>{task.totalLoggedTime}</Progress.Label>
									</Progress.Section>
								</Progress.Root>
							</div>
							<div className="task__progress">
								<span className="task__key">Осталось:</span>
								<Progress.Root size="xl">
									<Progress.Section value={task.remainingPercents ?? 0}>
										<Progress.Label>{task.remainingTime}</Progress.Label>
									</Progress.Section>
								</Progress.Root>
							</div>
						</div>
					)}
				</aside>
			</div>
			<div className="task__footer">
				<Tabs defaultValue="comments" onChange={onSetActiveTab}>
					<Tabs.List>
						<Tabs.Tab value="comments" leftSection={<IconMessageCircle size={15} />}>
							Комментарии
						</Tabs.Tab>
						<Tabs.Tab value="logs" leftSection={<IconClockHour3 size={15} />}>
							Логи
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>
				{activeTab === 'comments' ? <Comments /> : <TaskLogs logs={task.timeLogs} />}
			</div>
		</div>
	);
};

export { TaskView };
