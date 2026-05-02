import { typedEntries } from '@/app/utils.ts';
import { CustomTable } from '@/components/common/shared/custom-table.tsx';
import { TABLE_HEADER } from '@/pages/global-search/table-contants.ts';
import type { SearchResults, TSearchResultsValues } from '@/pages/global-search/types.ts';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx';
import { ACCORDION_TITLES } from '@/pages/global-search/constants.ts';

interface IProps {
	results?: Partial<SearchResults>;
	onRowDoubleClick: (items: TSearchResultsValues, uuid: string) => void;
}

const SearchResultsView: React.FC<IProps> = ({ results, onRowDoubleClick }) => {
	return (
		<div className="w-full p-5">
			<h1 className="text-[18px] font-medium text-white mb-2">Результаты поиска:</h1>
			{results ? (
				<Accordion type="multiple" className="rounded-lg border">
					{typedEntries(results).map(([key, value]) => {
						return (
							<AccordionItem key={key} value={key} className="border-b px-4 last:border-b-0">
								<AccordionTrigger className="text-muted-foreground cursor-pointer">
									{ACCORDION_TITLES[key]}
								</AccordionTrigger>
								<AccordionContent>
									<CustomTable
										key={key}
										headerData={TABLE_HEADER[key]}
										tableData={value ?? []}
										outOfDataMessage="Ничего не найдено"
										onRowDoubleClick={(uuid) => onRowDoubleClick(value ?? [], uuid)}
									/>
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			) : (
				<div>Здесь ничего нет</div>
			)}
		</div>
	);
};

export { SearchResultsView };
