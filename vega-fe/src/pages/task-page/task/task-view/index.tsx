import './styles.less';
import { Button, Popover, Progress, Timeline } from '@mantine/core';
import type { IDictionary, ITask } from '../../../../api/types.ts';
import React from 'react';
import { BULLET_ICONS } from '../../constants.ts';

interface IProps {
	task: ITask;
	taskStatuses?: IDictionary[];
	activeTaskStatus: number;
}

const TaskView: React.FC<IProps> = ({ task, activeTaskStatus, taskStatuses }) => {
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
					<div className="task__subtitle">
						<p className="task__name">{task.title}</p>
					</div>
				</div>
			</div>
			<div className="task__container">
				<div className="task__content">
					<div className="task__controlls">
						<Button className="task__button">Редактировать</Button>
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
														<button className="task__dropdown-button">
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
								<span className="task__value">{task.taskStackUuid}</span>
							</div>
							<div className="task__row">
								<span className="task__key">Приоритет:</span>
								<span className="task__value">{task.taskPriorityUuid}</span>
							</div>
						</div>
					</div>
					<div className="task__description">
						<div className="task__heading">Описание задачи:</div>
						<div className="task__text">{task.description}</div>
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
