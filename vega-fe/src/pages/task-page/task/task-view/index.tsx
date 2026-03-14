import './styles.less';
import { Button, Divider, Popover, Progress, Select, Tabs, Textarea, TextInput, Timeline } from '@mantine/core';
import type { IDictionary } from '../../../../api/types.ts';
import React from 'react';
import { BULLET_ICONS, GREEN_COLOR, RED_COLOR } from '../../constants.ts';
import { IconCheck, IconMessageCircle, IconPencil, IconClockHour3, IconX, IconPlus } from '@tabler/icons-react';
import type { ITask, TOption } from '../../types.ts';
import { Comments } from '../../comments';
import { TaskLogs } from '../../task-logs';
import { SelectWithDot } from '../../../../ui/select-with-dot';

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
			<div className="task__content">
				<div className="task__breadcrumbs">project Задачи num</div>
				<div className="task__title">task title</div>
				<div className="task__controls">
					<SelectWithDot options={[]} size="xs" />
					<SelectWithDot options={[]} size="xs" />
					<SelectWithDot options={[]} size="xs" />
				</div>
				<Divider orientation="horizontal" className="task__divider" />
				<div className="task__description">
					<div className="task__subtitle">Описание</div>
					<div className="task__text">
						task with lon titlte task with lon titlte task with lon titlte task with lon titlte task with
						lon titlte task with lon titlte task with lon titlte task with lon titlte task with lon titlte
						task with lon titlte task with lon titlte task with lon titlte task with lon titlte task with
						lon titlte.
					</div>
				</div>
				<Divider orientation="horizontal" className="task__divider" />
				<div className="task__tabs">
					<Tabs>
						<Tabs.List className="task__tabs-list">
							<Tabs.Tab value="description">Комментарии</Tabs.Tab>
							<Tabs.Tab value="tasks">Логи</Tabs.Tab>
						</Tabs.List>
					</Tabs>
				</div>
			</div>
			<aside className="task__aside">
				<div className="task__block">
					<div className="task__info">
						<div className="task__subtitle">Описание</div>
						<div className="task__label">
							<div className="task__key">Автор</div>
							<div className="task__value">Иванов Иван</div>
						</div>
						<div className="task__label">
							<div className="task__key">Исполнитель</div>
							<div className="task__value">
								<a className="task__link">+ назначить меня</a>
							</div>
						</div>
						<div className="task__label">
							<div className="task__key" />
							<div className="task__value">
								<a className="task__link">+ назначить</a>
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
						<div className="task__progress">
							<div className="task__bar">
								<div className="task__time">
									<span className="task__estimate">Оценка</span>
									<span className="task__log">1ч</span>
								</div>
								<Progress value={50} size="xs" />
							</div>
							<div className="task__bar">
								<div className="task__time">
									<span className="task__estimate">Потрачено</span>
									<span className="task__log">30м</span>
								</div>
								<Progress value={50} size="xs" />
							</div>
							<div className="task__bar">
								<div className="task__time">
									<span className="task__estimate">Осталось</span>
									<span className="task__log">30м</span>
								</div>
								<Progress value={50} size="xs" />
							</div>
						</div>
						<div className="task__button">
							<Button>
								<IconPlus size={18} />
								<span>Записать время</span>
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
							<div className="task__value">Бэклог</div>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export { TaskView };
