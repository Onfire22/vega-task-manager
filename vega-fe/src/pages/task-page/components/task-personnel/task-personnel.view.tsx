import React from 'react';
import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import type { ITask, TTaskFields } from '@/pages/task-page/types.ts';

interface IProps {
	task: ITask | null;
	searchValue: string;
	isUsersLoading: boolean;
	usersListOptions: Array<{ label: string; value: string }>;
	currentUserId?: string;
	onUpdateTask: (fieldName: TTaskFields | '', value: string) => void;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskPersonnelView: React.FC<IProps> = ({
	task,
	searchValue,
	isUsersLoading,
	usersListOptions,
	currentUserId,
	onUpdateTask,
	onSearchChange,
}) => {
	return (
		task && (
			<div className="border-b">
				<div className="p-3.75">
					<div className="text-muted-foreground uppercase text-[11px] mb-2.5">Сотрудники</div>
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
								<a className="link-styled" onClick={() => onUpdateTask('assigneeUuid', currentUserId!)}>
									+ назначить меня
								</a>
							)}
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-[12px]" />
						<div className="text-[14px]">
							<CustomPopover trigger={<a className="link-styled">+ назначить</a>}>
								<CustomInput
									placeholder="Поиск"
									type="text"
									value={searchValue}
									onChange={onSearchChange}
								/>
								{isUsersLoading && <CustomLoader />}
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
							</CustomPopover>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export { TaskPersonnelView };
