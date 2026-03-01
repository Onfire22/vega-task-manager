import React from 'react';
import { Loader, Table } from '@mantine/core';
import { TABLE_HEADER } from '../../../table-header.ts';
import './styles.less';
import type { IProject } from '../../../types.ts';

interface IProps {
	projects?: IProject[];
	isLoading: boolean;
}

const ProjectTableView: React.FC<IProps> = ({ projects, isLoading }) => {
	return (
		<div className="projects-table">
			<Table highlightOnHover withTableBorder withColumnBorders>
				<Table.Thead>
					<Table.Tr>
						{TABLE_HEADER.map((item) => {
							return <Table.Th key={item.id}>{item.name}</Table.Th>;
						})}
					</Table.Tr>
				</Table.Thead>
				{isLoading && (
					<Table.Caption>
						<Loader />
					</Table.Caption>
				)}
				{!projects?.length && !isLoading && <Table.Caption>Проектов нет</Table.Caption>}
				<Table.Tbody>
					{projects?.map((project) => {
						return (
							<Table.Tr ta="center" key={project.id}>
								{TABLE_HEADER.map((item) => {
									const key = item.id as keyof IProject;
									return <Table.Td key={item.id}>{project[key] as string}</Table.Td>;
								})}
							</Table.Tr>
						);
					})}
				</Table.Tbody>
			</Table>
		</div>
	);
};

export { ProjectTableView };
