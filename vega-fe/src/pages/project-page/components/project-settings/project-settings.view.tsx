import React from 'react';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { CustomCalendar } from '@/components/common/shared/custom-calendar.tsx';
import { parseDate } from '@/app/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { CustomProgress } from '@/components/common/ui/custom-progress.tsx';
import type { IDictionaryWithColor, IField, IProject, TActiveFiled } from '@/pages/project-page/types.ts';

interface IProps {
	project: IProject | null;
	dictionariesOptions: Array<IDictionaryWithColor>;
	activeField: IField;
	projectProgress: number;
	onProjectFieldChange: (fieldName: TActiveFiled, value: string | Date) => void;
	onSetActiveFiled: (fieldName: string, value: string | null) => void;
}

const ProjectSettingsView: React.FC<IProps> = ({
	project,
	dictionariesOptions,
	activeField,
	projectProgress,
	onProjectFieldChange,
	onSetActiveFiled,
}) => {
	return (
		project && (
			<div className="border-b">
				<div className="p-3.75">
					<div className="flex flex-col gap-5">
						<div className="flex flex-col">
							<span className="text-[11px] uppercase text-muted-foreground tracking-wide flex items-center justify-between">
								Статус
							</span>
							{project.canEdit ? (
								<CustomSelect
									options={dictionariesOptions}
									value={project.projectStatus.id}
									onChange={(value) => onProjectFieldChange('projectStatusUuid', value)}
								/>
							) : (
								<div>{project.projectStatus.label}</div>
							)}
						</div>
						<div className="flex flex-col">
							<span className="text-[11px] uppercase text-muted-foreground tracking-wide flex items-center justify-between">
								Дата проекта
							</span>
							<span className="text-[14px] font-medium">{project.createdAt}</span>
						</div>
						<div className="flex flex-col">
							{activeField.fieldName === 'deadlineDate' ? (
								<div className="flex flex-col gap-2.5">
									<CustomCalendar
										value={parseDate(project.deadlineDate)}
										onChange={(value) => {
											if (!value) return;
											onProjectFieldChange('deadlineDate', value);
										}}
									/>
									<Button onClick={() => onSetActiveFiled('', '')} size="lg">
										Отмена
									</Button>
								</div>
							) : (
								<>
									<span className="text-[11px] uppercase text-muted-foreground tracking-wide flex items-center justify-between">
										<span>Дедлайн</span>
										{project.deadlineDate && project.canEdit ? (
											<a
												className="link-styled"
												onClick={() => onSetActiveFiled('deadlineDate', project.deadlineDate)}
											>
												изменить
											</a>
										) : null}
									</span>
									<span
										className={cn('font-medium text-[14px]', project.deadlineDate && 'text-danger')}
									>
										{project.deadlineDate ?? (
											<a
												className="link-styled"
												onClick={() => onSetActiveFiled('deadlineDate', project.deadlineDate)}
											>
												+ установить
											</a>
										)}
									</span>
								</>
							)}
						</div>
						<div className="flex flex-col">
							<span className="text-[11px] uppercase text-muted-foreground tracking-wide flex items-center justify-between">
								Прогресс
							</span>
							<CustomProgress progress={projectProgress} />
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export { ProjectSettingsView };
