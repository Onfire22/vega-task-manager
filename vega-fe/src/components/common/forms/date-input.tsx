import { Popover, PopoverContent } from '../../ui/popover.tsx';
import { PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { CustomCalendar } from '@/components/common/shared/custom-calendar.tsx';
import React from 'react';

interface IProps {
	value?: Date;
	onChange: (value?: Date) => void;
	label?: string;
	description?: string;
	isRequired?: boolean;
}

const DateInput: React.FC<IProps> = ({ value, onChange, label, description, isRequired }) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div>
					<div className="flex flex-col ml-1 mb-1">
						{label && (
							<span className="text-[14px] block">
								{label}
								{isRequired && <span className="text-(--color-danger)"> *</span>}
							</span>
						)}
						{description && (
							<span className="text-[12px] items-center text-muted-foreground">{description}</span>
						)}
					</div>
					<Button variant="default" type="button" className="w-full justify-start text-left font-normal">
						<CalendarIcon className="mr-2 size-4" />
						{value ? format(value, 'dd.MM.yyyy') : 'Выберите дату'}
					</Button>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<CustomCalendar value={value} onChange={onChange} />
			</PopoverContent>
		</Popover>
	);
};

export { DateInput };
