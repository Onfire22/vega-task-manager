import { CustomPopover } from '@/components/common/shared/custom-popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { ROLES_COLORS, VIEWER_ROLE_UUID } from '@/pages/project-page/constants.ts';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import React from 'react';
import type { IDictionaryWithColor, IProjectUserSelect } from '@/pages/project-page/types.ts';

interface IProps {
	searchValue: string;
	usersListOptions: Array<{ label: string; value: string }>;
	roleTypeOptions: Array<IDictionaryWithColor>;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onUpdateUserRole: (userUuid: string, userRole: string) => void;
	usersList: Array<IProjectUserSelect>;
	canEdit?: boolean;
}

const ProjectMembersView: React.FC<IProps> = ({
	searchValue,
	usersListOptions,
	roleTypeOptions,
	onSearchChange,
	onUpdateUserRole,
	usersList,
	canEdit,
}) => {
	return (
		<div className="border-b">
			<div className="p-3.75">
				<div className="flex items-center justify-between">
					<span className="text-[11px] uppercase text-muted-foreground tracking-wide flex items-center justify-between">
						Участники проекта
					</span>
					{canEdit && (
						<CustomPopover
							align="end"
							trigger={
								<Button size="xs" className="p-0 w-7.5 h-5 text-white">
									+
								</Button>
							}
						>
							<CustomInput
								placeholder="Поиск"
								value={searchValue}
								onChange={onSearchChange}
								type="text"
							/>
							{!usersListOptions.length ? (
								<div className="text-center">Ничего не найдено</div>
							) : (
								<ul className="mt-2.5">
									{usersListOptions.map((user) => {
										return (
											<li
												className="p-1.25 gap-2.5 text-sm flex items-center justify-between"
												key={user.value}
											>
												<span>{user.label}</span>
												<div className="flex items-center gap-1.75">
													<Button
														onClick={() => onUpdateUserRole(user.value, VIEWER_ROLE_UUID)}
													>
														+ Пригласить
													</Button>
												</div>
											</li>
										);
									})}
								</ul>
							)}
						</CustomPopover>
					)}
				</div>
				<ul className="mt-2.5">
					{usersList.map((user) => {
						return (
							<li className="p-1.25 text-sm flex items-center gap-2.5" key={user.id}>
								<div
									className="w-7.5 h-6.25 text-[11px] text-white flex items-center justify-center rounded-full"
									style={{ backgroundColor: user.color }}
								>
									{user.userInitials}
								</div>
								<div className="w-full text-[11px] text-muted-foreground">
									<div className="flex items-center justify-between gap-1">
										<div className="flex flex-col flex-1 min-w-0">
											<div className="text-[12px] text-foreground truncate">{user.userName}</div>
											<div className="truncate">{user.userSpecialisation}</div>
										</div>
										{canEdit ? (
											<div className="w-35 shrink-0">
												<CustomSelect
													options={roleTypeOptions}
													value={user.userRole.id}
													onChange={(value) => {
														onUpdateUserRole(user.id, value);
													}}
													size="sm"
												/>
											</div>
										) : (
											<span
												style={{
													color: ROLES_COLORS[user.userRole.key as keyof typeof ROLES_COLORS],
												}}
											>
												{user.userRole.label}
											</span>
										)}
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export { ProjectMembersView };
