import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { Field, FieldLabel } from '@/components/ui/field.tsx';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import React from 'react';

const options = [
	{ value: '15', label: '15' },
	{ value: '25', label: '25' },
	{ value: '50', label: '50' },
];

interface IProps {
	pagination: {
		pages: Array<number | null>;
		activePage: number;
		hasNext: boolean;
		hasPrev: boolean;
		totalPages: number;
	};
	onPageClick: (page: number) => void;
	onPageLimitChange: (page: number) => void;
	onPaginationSideButtonsClick: (side: 'next' | 'prev') => void;
}

const CustomPagination: React.FC<IProps> = ({
	pagination,
	onPageClick,
	onPageLimitChange,
	onPaginationSideButtonsClick,
}) => {
	return (
		<div className="flex items-center gap-4">
			<Field orientation="horizontal" className="w-fit">
				<FieldLabel htmlFor="select-rows-per-page" className="whitespace-nowrap">
					Показать на странице
				</FieldLabel>
				<Select defaultValue="15" onValueChange={(value) => onPageLimitChange(Number(value))}>
					<SelectTrigger className="w-20" id="select-rows-per-page">
						<SelectValue />
					</SelectTrigger>
					<SelectContent position="popper" align="start">
						<SelectGroup>
							{options.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>
			{pagination.totalPages > 1 && (
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationNext
								onClick={() => onPaginationSideButtonsClick('next')}
								disabled={!pagination.hasNext}
							/>
						</PaginationItem>
						{pagination.pages.map((page, index) => {
							return page ? (
								<PaginationItem key={page}>
									<PaginationLink
										isActive={page === pagination.activePage}
										onClick={() => onPageClick(page)}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							) : (
								<PaginationItem key={`ellipsis-${index}`}>
									<PaginationEllipsis />
								</PaginationItem>
							);
						})}
						<PaginationItem>
							<PaginationPrevious
								onClick={() => onPaginationSideButtonsClick('prev')}
								disabled={!pagination.hasPrev}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}
		</div>
	);
};

export { CustomPagination };
