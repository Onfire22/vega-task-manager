import { Calendar } from '@/components/ui/calendar.tsx';
import { ru } from 'date-fns/locale';
import React from 'react';

interface IProps {
	value?: Date;
	onChange: (value?: Date) => void;
}

const CustomCalendar: React.FC<IProps> = ({ value, onChange }) => {
	return (
		<Calendar
			mode="single"
			selected={value}
			onSelect={onChange}
			modifiers={{
				weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
			}}
			modifiersClassNames={{
				weekend: 'text-danger',
			}}
			locale={ru}
			weekStartsOn={1}
			className="rounded-lg border"
		/>
	);
};

export { CustomCalendar };
