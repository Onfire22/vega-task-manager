import './styles.less';
import { Button, Popover, Progress, Select, Textarea, TextInput, Timeline } from '@mantine/core';
import type { IDictionary, ITask } from '../../../../api/types.ts';
import React from 'react';
import { BULLET_ICONS } from '../../constants.ts';
import { IconDeviceFloppy, IconPencil, IconX } from '@tabler/icons-react';

interface IProps {
	task: ITask;
	taskStatuses?: IDictionary[];
	activeTaskStatus: number;
	onTaskStatusUpdate: (uuid: string, status: string) => void;
	field: { fieldName: string; value: string };
	onSetEditField: (fieldName: string, value: string) => void;
	onCancelChanges: () => void;
	onFieldChange: {
		(fieldName: string, e: React.ChangeEvent<HTMLInputElement>): void;
		(fieldName: string, e: React.ChangeEvent<HTMLTextAreaElement>): void;
	};
	options: { type: Array<{ label: string; value: string }>; priority: Array<{ label: string; value: string }> };
}

const TaskView: React.FC<IProps> = ({
	task,
	activeTaskStatus,
	taskStatuses,
	onTaskStatusUpdate,
	field,
	onSetEditField,
	onFieldChange,
	options,
	onCancelChanges,
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
							<IconDeviceFloppy size={30} />
							<IconX size={30} onClick={onCancelChanges} />
						</div>
					) : (
						<div className="task__subtitle task__editable-field">
							<p className="task__name">{task.title}</p>
							<IconPencil size={18} onClick={() => onSetEditField('title', task.title)} />
						</div>
					)}
				</div>
			</div>
			<div className="task__container">
				<div className="task__content">
					<div className="task__controlls">
						<Button className="task__button">Учет времени</Button>
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
								<span className="task__key">Тип</span>
								{field.fieldName === 'stack_type' ? (
									<div className="task__field">
										<Select
											value={field.value}
											data={options.type}
											size="xs"
											onChange={(value) => {
												if (value) {
													onSetEditField('stack_type', value);
												}
											}}
										/>
										<IconDeviceFloppy size={30} />
										<IconX size={30} onClick={onCancelChanges} />
									</div>
								) : (
									<div className="task__subtitle task__editable-field">
										<p className="task__name">{task.taskStackUuid}</p>
										<IconPencil
											size={18}
											onClick={() => onSetEditField('stack_type', task.taskStackUuid)}
										/>
									</div>
								)}
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
													onSetEditField('task_priority', value);
												}
											}}
										/>
										<IconDeviceFloppy size={30} />
										<IconX size={30} onClick={onCancelChanges} />
									</div>
								) : (
									<div className="task__subtitle task__editable-field">
										<p className="task__name">{task.taskPriorityUuid}</p>
										<IconPencil
											size={18}
											onClick={() => onSetEditField('task_priority', task.taskPriorityUuid)}
										/>
									</div>
								)}
							</div>
							<div className="task__row">
								<span className="task__key">Статус</span>
								<span className="task__value">{task.taskStatusUuid}</span>
							</div>
						</div>
					</div>
					<div className="task__description">
						<div className="task__heading">Описание задачи:</div>
						{field.fieldName === 'description' ? (
							<div className="task__field">
								<Textarea
									className="task__textarea"
									resize="vertical"
									value={field.value}
									onChange={(e) => onFieldChange('description', e)}
								/>
								<IconDeviceFloppy size={30} />
								<IconX size={30} onClick={onCancelChanges} />
							</div>
						) : (
							<div className="task__subtitle task__editable-field">
								<p className="task__name">{task.description}</p>
								<IconPencil size={18} onClick={() => onSetEditField('description', task.description)} />
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
							<span className="task__value">{task.assigneeUuid}</span>
						</div>
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
							<Progress value={50} />
						</div>
						<div className="task__progress">
							<span className="task__key">Потрачено:</span>
							<Progress value={50} />
						</div>
						<div className="task__progress">
							<span className="task__key">Осталось:</span>
							<Progress value={33} />
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
};

export { TaskView };
