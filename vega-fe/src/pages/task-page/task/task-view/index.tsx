import './styles.less';
import { Button, Popover, Progress, Select, Textarea, TextInput, Timeline } from '@mantine/core';
import type { IDictionary } from '../../../../api/types.ts';
import React from 'react';
import { BULLET_ICONS, GREEN_COLOR, RED_COLOR } from '../../constants.ts';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import type { ITask, TOption } from '../../types.ts';
import { CustomBadge } from '../../../../components/custom-badge';
import { CustomStatus } from '../../../../components/custom-status';

interface IProps {
	task: ITask;
	taskStatuses?: IDictionary[];
	activeTaskStatus: number;
	onTaskStatusUpdate: (uuid: string, status: string) => void;
	field: { fieldName: string; value: string };
	onEditField: (fieldName: string, value: string | null) => void;
	onCancelChanges: () => void;
	onLogWorkModalShown: () => void;
	onFieldChange: {
		(fieldName: string, e: React.ChangeEvent<HTMLInputElement>): void;
		(fieldName: string, e: React.ChangeEvent<HTMLTextAreaElement>): void;
	};
	options: { type: Array<TOption>; priority: Array<TOption> };
	usersListOptions: Array<TOption>;
}

const TaskView: React.FC<IProps> = ({
	task,
	activeTaskStatus,
	taskStatuses,
	onTaskStatusUpdate,
	field,
	onEditField,
	onFieldChange,
	options,
	onCancelChanges,
	onLogWorkModalShown,
	usersListOptions,
}) => {
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
							<IconCheck size={25} color={GREEN_COLOR} />
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
															onClick={() => onTaskStatusUpdate(task.id, status.id)}
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
								{field.fieldName === 'stack_type' ? (
									<div className="task__field">
										<Select
											value={field.value}
											data={options.type}
											size="xs"
											onChange={(value) => {
												if (value) {
													onEditField('stack_type', value);
												}
											}}
										/>
										<IconCheck size={25} color={GREEN_COLOR} />
										<IconX size={25} onClick={onCancelChanges} color={RED_COLOR} />
									</div>
								) : (
									<div className="task__subtitle task__editable-field">
										<CustomBadge color={task.taskStackUuid.color} text={task.taskStackUuid.name} />
										<IconPencil
											className="task__edit-icon"
											size={18}
											onClick={() => onEditField('stack_type', task.taskStackUuid.name)}
										/>
									</div>
								)}
							</div>
							<div className="task__row">
								<span className="task__key">Статус:</span>
								<CustomBadge text={task.taskStatusUuid.name} color={task.taskStatusUuid.color} />
							</div>
							<div className="task__row">
								<span className="task__key">Приоритет:</span>
								{field.fieldName === 'task_priority' ? (
									<div className="task__field">
										<Select
											value={field.value}
											data={options.priority}
											size="xs"
											onChange={(value) => {
												if (value) {
													onEditField('task_priority', value);
												}
											}}
										/>
										<IconCheck size={25} color={GREEN_COLOR} />
										<IconX size={25} onClick={onCancelChanges} color={RED_COLOR} />
									</div>
								) : (
									<div className="task__subtitle task__editable-field">
										<CustomStatus data={task.taskPriorityUuid} size={17} />
										<IconPencil
											className="task__edit-icon"
											size={18}
											onClick={() => onEditField('task_priority', task.taskPriorityUuid.name)}
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
								<IconCheck size={25} color={GREEN_COLOR} />
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
							<span className="task__value">{task.reporterUuid}</span>
						</div>
						<div className="task__row">
							<span className="task__key">Испольнитель:</span>
							{field.fieldName === 'assigneeUuid' ? (
								<div className="task__field">
									<Select
										value={field.value}
										data={usersListOptions}
										size="xs"
										onChange={(value) => {
											if (value) {
												onEditField('assigneeUuid', value);
											}
										}}
									/>
									<IconCheck size={25} color={GREEN_COLOR} />
									<IconX size={25} onClick={onCancelChanges} color={RED_COLOR} />
								</div>
							) : (
								<div className="task__subtitle task__editable-field">
									<p className="task__name">{task.assigneeUuid}</p>
									<IconPencil
										className="task__edit-icon"
										size={18}
										onClick={() => onEditField('assigneeUuid', task.assigneeUuid)}
									/>
								</div>
							)}
						</div>
						<a className="task__link">assign on me</a>
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
					<div className="task__details">
						<div className="task__heading">Учет времени</div>
						<div className="task__progress">
							<span className="task__key">Оценка:</span>
							<Progress.Root size="xl">
								<Progress.Section value={100}>
									<Progress.Label>1h</Progress.Label>
								</Progress.Section>
							</Progress.Root>
						</div>
						<div className="task__progress">
							<span className="task__key">Потрачено:</span>
							<Progress.Root size="xl">
								<Progress.Section value={50}>
									<Progress.Label>1h</Progress.Label>
								</Progress.Section>
							</Progress.Root>
						</div>
						<div className="task__progress">
							<span className="task__key">Осталось:</span>
							<Progress.Root size="xl">
								<Progress.Section value={50}>
									<Progress.Label>1h</Progress.Label>
								</Progress.Section>
							</Progress.Root>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
};

export { TaskView };
