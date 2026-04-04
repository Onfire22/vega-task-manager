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
import type { Action } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/store/hooks.ts';

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
	onSideButtonClick: (side: 'next' | 'prev') => void;
}

const CustomPagination: React.FC<IProps> = ({ pagination, onPageClick, onPageLimitChange, onSideButtonClick }) => {
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
							<PaginationNext onClick={() => onSideButtonClick('next')} disabled={!pagination.hasNext} />
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
								onClick={() => onSideButtonClick('prev')}
								disabled={!pagination.hasPrev}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}
		</div>
	);
};

const usePaginationHandlers = (
	paginationState: { page: number; pageLimit: number },
	setPagination: (state: { page: number; pageLimit: number }) => Action,
) => {
	const dispatch = useAppDispatch();
	const handlePageClick = (page: number) => {
		dispatch(setPagination({ ...paginationState, page }));
	};

	const handleSideButtonClick = (side: 'next' | 'prev') => {
		const page = side === 'next' ? paginationState.page + 1 : paginationState.page - 1;
		handlePageClick(page);
	};

	const handlePageLimitChange = (pageLimit: number) => {
		dispatch(setPagination({ page: 1, pageLimit }));
	};

	return { handlePageClick, handleSideButtonClick, handlePageLimitChange };
};

// eslint-disable-next-line react-refresh/only-export-components
export { CustomPagination, usePaginationHandlers };
