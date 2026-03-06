import { Table } from '@mantine/core';
import React from 'react';

interface IProps {
	tableData: Array<{ [key: string]: any }>;
	headerData: Array<{
		id: string;
		width?: string;
		name: string;
		customHeaderComponent?: React.ComponentType<{ column: any }>;
		customCellComponent?: React.ComponentType<{ data: any; columnName: string }>;
	}>;
	outOfDataMessage: string;
	onRowDoubleClick: (uuid: string) => void;
}

const CustomTable: React.FC<IProps> = ({ tableData, headerData, outOfDataMessage, onRowDoubleClick }) => {
	return (
		<Table highlightOnHover withTableBorder withColumnBorders>
			<Table.Thead>
				<Table.Tr>
					{headerData.map((data) => {
						const { width, id, name, customHeaderComponent: CustomHeaderComponent } = data;
						return (
							<Table.Th style={{ width: width }} key={id}>
								{CustomHeaderComponent ? <CustomHeaderComponent column={data} /> : name}
							</Table.Th>
						);
					})}
				</Table.Tr>
			</Table.Thead>
			{!tableData.length && <Table.Caption>{outOfDataMessage}</Table.Caption>}
			<Table.Tbody>
				{tableData.map((data) => {
					return (
						<Table.Tr ta="center" key={data.id} onDoubleClick={() => onRowDoubleClick(data.id)}>
							{headerData.map((item) => {
								const CustomCell = item?.customCellComponent;
								if (CustomCell) {
									return (
										<Table.Td key={item.id}>
											<CustomCell data={data[item.id]} columnName={item.id} />
										</Table.Td>
									);
								}
								return <Table.Td key={item.id}>{data[item.id] as string}</Table.Td>;
							})}
						</Table.Tr>
					);
				})}
			</Table.Tbody>
		</Table>
	);
};

export { CustomTable };
