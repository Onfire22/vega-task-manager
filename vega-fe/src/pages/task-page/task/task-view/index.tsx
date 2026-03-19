import { Button, Divider, Popover, Progress, Tabs, Textarea, TextInput } from '@mantine/core';
import React from 'react';
import { BLUE_COLOR, GREEN_COLOR, RED_COLOR, TASK_PRIORITIES, TASK_STATUSES, TASK_TYPES } from '../../constants.ts';
import { ArrowBigRight, Plus } from 'lucide-react';
import type { ITask, TOption } from '../../types.ts';
import { SelectWithDot } from '../../../../ui/select-with-dot';
import './styles.less';
import { Comments } from '../../comments';
import { TaskLogs } from '../../task-logs';
import { Link } from 'react-router-dom';
import { CustomBadge } from '../../../../components/custom-badge';

interface IProps {
	task: ITask | null;
	currentUserId?: string;
	activeTab: string | null;
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
	onSetActiveTab: (value: string | null) => void;
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
		<div className="task">
			<div className="task__content">
				<div className="task__breadcrumbs">
					<Link className="task__breadcrumb" to={`/project/${task.project.id}`}>
						project {task.project.code}
					</Link>
					<ArrowBigRight size={15} />
					<Link
						className="task__breadcrumb"
						state={{ from: location.pathname }}
						to={`/project/${task.project.id}`}
					>
						задачи
					</Link>
					<ArrowBigRight size={15} />
					<span>{task.code}</span>
				</div>
				{field.fieldName === 'title' ? (
					<div className="task__input">
						<TextInput
							value={field.value}
							onChange={(e) => {
								onFieldChange(e, 'title');
							}}
						/>
						<div className="task__butons">
							<Button
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
					<div className="task__field">
						<div
							className="task__title"
							onClick={() => {
								onSetFieldToEdit('title', task.title);
							}}
						>
							{task.title}
						</div>
					</div>
				)}
				<div className="task__controls">
					<SelectWithDot
						size="xs"
						leftSection="Статус"
						options={options.taskStatus}
						statuses={TASK_STATUSES}
						value={task.taskStatus}
						onChange={(value) => {
							if (!value) return;
							onUpdateTask('taskStatus', value);
						}}
					/>
					<SelectWithDot
						size="xs"
						leftSection="Тип"
						options={options.taskType}
						statuses={TASK_TYPES}
						value={task.taskStack}
						onChange={(value) => {
							if (!value) return;
							onUpdateTask('taskStack', value);
						}}
					/>
					<SelectWithDot
						size="xs"
						leftSection="Приоритет"
						options={options.taskPriority}
						statuses={TASK_PRIORITIES}
						value={task.taskPriority}
						onChange={(value) => {
							if (!value) return;
							onUpdateTask('taskPriority', value);
						}}
					/>
				</div>
				<Divider orientation="horizontal" className="task__divider" />
				<div className="task__description">
					<div className="task__description-subtitle">Описание</div>
					{field.fieldName === 'description' ? (
						<div className="task__input">
							<Textarea
								resize="vertical"
								value={field.value}
								onChange={(e) => {
									onFieldChange(e, 'description');
								}}
							/>
							<div className="task__butons">
								<Button
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
						<div className="task__field">
							<div
								className="task__text"
								onClick={() => {
									onSetFieldToEdit('description', task.description);
								}}
							>
								{task.description}
							</div>
						</div>
					)}
				</div>
				<Divider orientation="horizontal" className="task__divider" />
				<div className="task__tabs">
					<Tabs value={activeTab} onChange={onSetActiveTab}>
						<Tabs.List className="task__tabs-list">
							<Tabs.Tab value="comments">Комментарии</Tabs.Tab>
							<Tabs.Tab value="logs">Логи</Tabs.Tab>
						</Tabs.List>
					</Tabs>
				</div>
				<div className="task__comments">
					{activeTab === 'comments' && <Comments />}
					{activeTab === 'logs' && <TaskLogs logs={task.timeLogs} />}
				</div>
			</div>
			<aside className="task__aside">
				<div className="task__block">
					<div className="task__info">
						<div className="task__subtitle">Описание</div>
						<div className="task__label">
							<div className="task__key">Автор</div>
							<div className="task__value">{task.reporter}</div>
						</div>
						<div className="task__label">
							<div className="task__key">Исполнитель</div>
							<div className="task__value">
								{task.assignee ? (
									<span>{task.assignee}</span>
								) : (
									<a className="task__link" onClick={() => onUpdateTask('assignee', currentUserId!)}>
										+ назначить меня
									</a>
								)}
							</div>
						</div>
						<div className="task__label">
							<div className="task__key" />
							<div className="task__value">
								<Popover width={260} position="bottom" withArrow>
									<Popover.Target>
										<a className="task__link">+ назначить</a>
									</Popover.Target>
									<Popover.Dropdown>
										<TextInput placeholder="Поиск" size="xs" />
										<ul className="task__users">
											{usersListOptions.map((user) => {
												return (
													<li
														className="task__user"
														key={user.value}
														onClick={() => onUpdateTask('assignee', user.value)}
													>
														{user.label}
													</li>
												);
											})}
										</ul>
									</Popover.Dropdown>
								</Popover>
							</div>
						</div>
					</div>
				</div>
				<div className="task__block">
					<div className="task__info">
						<div className="task__subtitle">Даты</div>
						<div className="task__label">
							<div className="task__key">Создано</div>
							<div className="task__value">09.03.2026</div>
						</div>
						<div className="task__label">
							<div className="task__key">Обновлено</div>
							<div className="task__value">10.03.2026</div>
						</div>
					</div>
				</div>
				<div className="task__block">
					<div className="task__info">
						<div className="task__subtitle">Учёт времени</div>
						{(task.estimateTime || task.totalLoggedTime) && (
							<div className="task__progress">
								<div className="task__bar">
									<div className="task__time">
										<span className="task__estimate">Оценка</span>
										<span className="task__log">{task.estimateTime}</span>
									</div>
									<Progress value={task.estimateTimeInSecs} size="xs" />
								</div>
								<div className="task__bar">
									<div className="task__time">
										<span className="task__estimate">Потрачено</span>
										<span className="task__log">{task.totalLoggedTime}</span>
									</div>
									<Progress value={task.loggedPercents} size="xs" color={BLUE_COLOR} />
								</div>
								<div className="task__bar">
									<div className="task__time">
										<span className="task__estimate">Осталось</span>
										<span className="task__log">{task.remainingTime}</span>
									</div>
									<Progress
										value={task.remainingPercents}
										size="xs"
										color={task.remainingPercents >= 50 ? GREEN_COLOR : RED_COLOR}
									/>
								</div>
							</div>
						)}
						<div className="task__button">
							<Button onClick={onLogWorkModalShown}>
								<Plus size={18} />
								{task.estimateTime ? <span>Записать время</span> : <span>Оценить задачу</span>}
							</Button>
						</div>
					</div>
				</div>
				<div className="task__block">
					<div className="task__info">
						<div className="task__subtitle">Проект</div>
						<div className="task__label">
							<div className="task__key">Название</div>
							<div className="task__value">Title</div>
						</div>
						<div className="task__label">
							<div className="task__key">Статус</div>
							<div className="task__value">
								<CustomBadge
									label={task.project.projectStatus.key}
									text={task.project.projectStatus.label}
									isFullWidth={false}
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
