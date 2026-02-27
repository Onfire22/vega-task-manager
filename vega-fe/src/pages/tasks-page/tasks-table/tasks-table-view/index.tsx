import './styles.less';
import { TableControls } from '../../table-controls';
import type { ITask, ITaskTableData, TActiveTab } from '../../types.ts';
import React from 'react';
import { Table } from '@mantine/core';
import { CustomTableHeaderCell } from '../../custom-table-header-cell/';
import { TABLE_HEADER } from '../../table-header.ts';
import { CELLS_WITH_BADGES } from '../../constants.ts';
import { CustomBadge } from '../../custom-badge';

interface IProps {
	activeTab: TActiveTab;
	tableData: ITaskTableData[];
	onRowDoubleClick: (uuid: string) => void;
}

const TasksTableView: React.FC<IProps> = ({ activeTab, tableData, onRowDoubleClick }) => {
	return (
		<div className="tasks-table">
			<TableControls activeTab={activeTab} />
			<Table highlightOnHover withTableBorder withColumnBorders>
				<Table.Thead>
					<Table.Tr>
						{TABLE_HEADER.map((item) => {
							return (
								<Table.Th
									style={{
										width: item.width || '',
									}}
									key={item.id}
								>
									<CustomTableHeaderCell column={item} />
								</Table.Th>
							);
						})}
					</Table.Tr>
				</Table.Thead>
				{!tableData.length && <Table.Caption>Задач нет</Table.Caption>}
				<Table.Tbody>
					{tableData.map((task) => {
						return (
							<Table.Tr ta="center" key={task.id} onDoubleClick={() => onRowDoubleClick(task.id)}>
								{TABLE_HEADER.map((item) => {
									const key = item.id as keyof ITask;
									if (CELLS_WITH_BADGES.includes(key)) {
										const badgeValue = task[key] as { name: string; color: string };
										return (
											<Table.Td key={item.id}>
												<CustomBadge text={badgeValue?.name} color={badgeValue?.color} />
											</Table.Td>
										);
									}
									return <Table.Td key={item.id}>{task[key] as string}</Table.Td>;
								})}
							</Table.Tr>
						);
					})}
				</Table.Tbody>
			</Table>
		</div>
	);
};

export { TasksTableView };
