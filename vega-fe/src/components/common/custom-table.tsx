import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table.tsx';
import React from 'react';
import { CustomLoader } from '@/components/common/custom-loader.tsx';

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
	isLoading?: boolean;
	onRowDoubleClick: (uuid: string) => void;
}

const CustomTable: React.FC<IProps> = ({ tableData, headerData, isLoading, outOfDataMessage, onRowDoubleClick }) => {
	return (
		<Table className="border-y border-border">
			<TableHeader>
				<TableRow className="divide-x divide-border">
					{headerData.map((data) => {
						const { width, id, name, customHeaderComponent: CustomHeaderComponent } = data;
						return (
							<TableHead style={{ width: width }} key={id}>
								{CustomHeaderComponent ? <CustomHeaderComponent column={data} /> : name}
							</TableHead>
						);
					})}
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading && (
					<TableRow className="hover:bg-transparent">
						<TableCell colSpan={headerData.length} className="text-center py-8">
							<CustomLoader />
						</TableCell>
					</TableRow>
				)}
				{!tableData.length && (
					<TableRow className="hover:bg-transparent">
						<TableCell colSpan={headerData.length} className="text-center text-muted-foreground">
							{outOfDataMessage}
						</TableCell>
					</TableRow>
				)}
				{tableData.map((data) => {
					return (
						<TableRow
							className="cursor-pointer divide-x divide-border"
							key={data.id}
							onDoubleClick={() => onRowDoubleClick(data.id)}
						>
							{headerData.map((item) => {
								const CustomCell = item?.customCellComponent;
								if (CustomCell) {
									return (
										<TableCell key={item.id}>
											<CustomCell data={data[item.id]} columnName={item.id} />
										</TableCell>
									);
								}
								return <TableCell key={item.id}>{data[item.id] as string}</TableCell>;
							})}
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export { CustomTable };
